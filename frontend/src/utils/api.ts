import {ExtendedPromise} from '@/hooks/use-api-call'

import {API_BASE_URL} from './constants'
import {sessionProvider} from './session'

export async function apiCall(path: string, init?: RequestInit) {
  if (!sessionProvider.session) throw new Error('세션이 만료되었습니다')
  // todo: refresh token on 401
  return fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {...init?.headers, Authorization: `Bearer ${sessionProvider.session.accessToken}`},
  })
}

const apiCallCache = new Map<string, ExtendedPromise<unknown>>()

export function getApiCache(path: string, init?: RequestInit) {
  const res = apiCallCache.get(path)
  if (res) return res
  const newRes = createApiCallPromise(path, init)
  apiCallCache.set(path, newRes)
  return newRes
}

export function invalidateApiCache(path: string) {
  apiCallCache.delete(path)
}

async function createApiCallPromise(path: string, init?: RequestInit) {
  const res = await apiCall(path, {
    ...init,
  })
  if (!res.ok) throw new Error(res.status.toString())
  return await res.json()
}
