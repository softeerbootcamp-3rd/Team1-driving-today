import {API_BASE_URL} from './constants'
import {sessionProvider} from './session'

export function apiCall(path: string, init?: RequestInit): Promise<Response> {
  if (!sessionProvider.session) throw new Error('세션이 만료되었습니다')
  // todo: refresh token on 401
  return fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {...init?.headers, Authorization: `Bearer ${sessionProvider.session.accessToken}`},
  })
}
