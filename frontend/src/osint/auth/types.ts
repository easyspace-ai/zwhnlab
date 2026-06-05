export interface CurrentUser {
  id: string
  username: string
  name?: string
  email: string
  subscription_plan: string
  credits_balance: number
  credits_used: number
  role: string
  disabled: boolean
  permissions?: string[]
  created_at: string
}

export interface AuthConfig {
  registration_enabled: boolean
}

export interface AuthLoginResponse {
  access_token: string
  token_type: string
  expires_in?: number
}

export interface PersistedAuthSlice {
  token: string | null
  user: CurrentUser | null
}

export type AuthFailureReason = 'expired' | 'invalid' | 'network' | 'unknown'
