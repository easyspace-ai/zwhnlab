import path from 'node:path'
import { fileURLToPath } from 'node:url'

const serviceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

/** Service package root (contains resources/). */
export function resolveServiceRoot(): string {
  const fromEnv = process.env.OHMYPPT_SERVICE_ROOT?.trim()
  if (fromEnv) return path.resolve(fromEnv)
  return serviceRoot
}

export function resolveResourcesRoot(): string {
  const fromEnv = process.env.OHMYPPT_RESOURCES_ROOT?.trim()
  if (fromEnv) return path.resolve(fromEnv)
  return path.join(resolveServiceRoot(), 'resources')
}

export function resolveStylesPath(): string {
  const fromEnv = process.env.OHMYPPT_STYLES_PATH?.trim()
  if (fromEnv) return path.resolve(fromEnv)
  return path.join(resolveResourcesRoot(), 'styles.json')
}
