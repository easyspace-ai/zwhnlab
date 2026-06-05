/** True when API responded that the session id does not exist or is not owned by the user. */
export function isSessionNotFoundError(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err)
  return /session not found/i.test(msg)
}
