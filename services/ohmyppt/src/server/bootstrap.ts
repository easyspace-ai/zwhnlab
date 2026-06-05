import { resolveServiceRoot } from './paths.js'

/**
 * oh-my-ppt resolves bundled assets via `process.cwd()/resources` when is.dev=true.
 * Point cwd at the service package root where copied resources/ lives.
 */
export function bootstrapOhMyPptRuntime(): void {
  const root = resolveServiceRoot()
  process.chdir(root)
  process.env.OHMYPPT_SERVICE_ROOT = root
}
