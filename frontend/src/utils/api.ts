import {ExtendedPromise} from '@/hooks/use-api-call'

import {API_BASE_URL} from './constants'
import {sessionProvider} from './session'

export async function apiCall(path: string, init?: RequestInit) {
  const session = sessionProvider.session
  if (!session) {
    throw new Error('세션 정보가 없습니다.')
  }
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `Bearer ${session.accessToken}`,
    },
  })
  if (res.status === 400 || res.status === 401) {
    sessionProvider.logout()
    throw new Error(String(res.status))
  }
  return res
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
  // console.log({res})
  if (!res.ok) throw new Error(res.status.toString())
  return await res.json()
}
