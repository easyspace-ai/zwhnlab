import { beforeEach, describe, expect, it } from 'vitest'
import { handleUnauthorizedResponse, resetUnauthorizedRedirectGuard } from './unauthorized'
import { useOsintAuthStore } from './store'

function makeJwt(expUnix: number): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const payload = btoa(JSON.stringify({ sub: 'user-1', exp: expUnix }))
  return `${header}.${payload}.sig`
}

describe('handleUnauthorizedResponse', () => {
  beforeEach(() => {
    resetUnauthorizedRedirectGuard()
    useOsintAuthStore.setState({
      token: null,
      user: null,
      ready: true,
      lastFailure: null,
    })
  })

  it('keeps session when token is still valid on 401', () => {
    const exp = Math.floor(Date.now() / 1000) + 3600
    const token = makeJwt(exp)
    useOsintAuthStore.setState({ token, user: { id: '1' } as never })

    handleUnauthorizedResponse(401, { skipRedirect: true })

    expect(useOsintAuthStore.getState().token).toBe(token)
    expect(useOsintAuthStore.getState().lastFailure).toBe('network')
  })

  it('clears session when token is expired on 401', () => {
    const exp = Math.floor(Date.now() / 1000) - 60
    useOsintAuthStore.setState({ token: makeJwt(exp), user: { id: '1' } as never })

    handleUnauthorizedResponse(401, { skipRedirect: true })

    expect(useOsintAuthStore.getState().token).toBeNull()
    expect(useOsintAuthStore.getState().lastFailure).toBe('expired')
  })
})
