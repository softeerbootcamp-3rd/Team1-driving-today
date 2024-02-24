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

const apiCallCache = new Map<string, {promise: ExtendedPromise<unknown>; gcId?: number}>()
const CACHE_PRESERVE_TIME = 3000

export function getApiCache(path: string, init?: RequestInit) {
  const res = apiCallCache.get(path)
  if (res) {
    if (res.gcId !== undefined) {
      // clear gc timeout
      clearTimeout(res.gcId)
      apiCallCache.set(path, {promise: res.promise})
    }
    return res.promise
  }
  const newRes = {promise: createApiCallPromise(path, init)}
  apiCallCache.set(path, newRes)
  return newRes.promise
}

export function invalidateApiCache(path: string) {
  const res = apiCallCache.get(path)
  if (res === undefined) return
  if (res.gcId !== undefined) clearTimeout(res.gcId)
  apiCallCache.delete(path)
}

// should be invoked on unmount
export function queueApiCacheInvalidation(path: string) {
  const res = apiCallCache.get(path)
  if (res === undefined) return

  if (res.gcId !== undefined) clearTimeout(res.gcId)

  const newId = setTimeout(() => {
    invalidateApiCache(path)
  }, CACHE_PRESERVE_TIME)

  apiCallCache.set(path, {promise: res.promise, gcId: newId})
}

async function createApiCallPromise(path: string, init?: RequestInit) {
  const res = await apiCall(path, {
    ...init,
  })
  if (!res.ok) throw new Error(res.status.toString())
  return await res.json()
}
