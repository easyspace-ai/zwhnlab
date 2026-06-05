import fs from 'node:fs/promises'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { bootstrapOhMyPptRuntime } from '../src/server/bootstrap.js'
import { resolveResourcesRoot } from '../src/server/paths.js'

describe('oh-my-ppt resources parity', () => {
  it('ships copied resources under services/ohmyppt/resources', async () => {
    bootstrapOhMyPptRuntime()
    const root = resolveResourcesRoot()
    await expect(fs.access(path.join(root, 'styles.json'))).resolves.toBeUndefined()
    await expect(fs.access(path.join(root, 'chart.v4.js'))).resolves.toBeUndefined()
    await expect(
      fs.access(path.join(root, 'skills/oh-my-ppt-layout/SKILL.md'))
    ).resolves.toBeUndefined()
  })

  it('ships all required product skills under resources/skills', async () => {
    const root = resolveResourcesRoot()
    for (const name of ['oh-my-ppt-layout', 'oh-my-ppt-chart', 'oh-my-ppt-data-anim']) {
      await expect(fs.access(path.join(root, 'skills', name, 'SKILL.md'))).resolves.toBeUndefined()
    }
  })
})
