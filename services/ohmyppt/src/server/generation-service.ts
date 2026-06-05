import type { GenerateChunkEvent } from '@shared/generation'
import { createEmitAssistantMessage } from '../ohmyppt/ipc/generation/generation-utils.js'
import {
  executeDeckGeneration,
  resolveDeckContext
} from '../ohmyppt/ipc/generation/deck-flow.js'
import { finalizeGenerationFailure } from '../ohmyppt/ipc/generation/finalization.js'
import { subscribeGenerationChunks } from '../adapters/generation-chunk-bus.js'
import type { OhMyPptRuntime } from './runtime.js'
import { upsertRequestModel } from './runtime.js'
import type { ServiceConfig } from './config.js'

export type GenerateOptions = {
  userMessage?: string
  signal?: AbortSignal
  model?: {
    provider?: string
    api_key?: string
    base_url?: string
    model?: string
    max_tokens?: number
  }
}

export class GenerationService {
  constructor(
    private readonly cfg: ServiceConfig,
    private readonly runtime: OhMyPptRuntime
  ) {}

  async run(
    sessionId: string,
    onChunk: (chunk: GenerateChunkEvent) => void,
    options: GenerateOptions = {}
  ): Promise<void> {
    const { ipc, agentManager } = this.runtime

    const activeRun = ipc.sessionRunStates.get(sessionId)
    if (activeRun?.status === 'running') {
      throw new Error('该会话正在生成中，请稍后再试或在其他窗口查看进度')
    }

    if (options.model) {
      await upsertRequestModel(this.runtime.db, ipc, this.cfg.defaultModel, options.model)
    }

    const unsubscribe = subscribeGenerationChunks(sessionId, (_sid, chunk) => {
      onChunk(chunk)
    })

    const emitAssistant = createEmitAssistantMessage(this.runtime.db, ipc.emitGenerateChunk)

    let context: Awaited<ReturnType<typeof resolveDeckContext>> | null = null
    try {
      context = await resolveDeckContext(ipc, {} as never, {
        sessionId,
        userMessage: options.userMessage || '',
        type: 'deck',
        chatType: 'main'
      })

      ipc.beginSessionRunState({
        sessionId: context.sessionId,
        runId: context.runId,
        mode: context.effectiveMode,
        totalPages: context.totalPages,
        previousSessionStatus: context.previousSessionStatus
      })

      await executeDeckGeneration(ipc, emitAssistant, context)
    } catch (error) {
      if (context) {
        await finalizeGenerationFailure(ipc, context, error)
      }
      throw error
    } finally {
      unsubscribe()
      agentManager.removeSession(sessionId)
    }
  }
}
