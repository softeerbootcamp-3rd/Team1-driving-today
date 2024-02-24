import {useCallback, useEffect, useState} from 'react'

import {apiCall, getApiCache, queueApiCacheInvalidation} from '@/utils/api'

export interface UseApiResult<T> {
  data?: T
  error?: unknown
  loading: boolean
  reload: () => void
}

interface UseApiCallbacks<T> {
  onSuccess?: (data: T) => void
  onError?: (errorCode: number) => void
}

export type UseApiParam<T> = Omit<RequestInit, 'signal'> & UseApiCallbacks<T>

export function useApiCall<T>(path: string, params: UseApiParam<T> = {}): UseApiResult<T> {
  const {onSuccess, onError, ...init} = params
  const [data, setData] = useState<T>()
  const [error, setError] = useState<unknown>()
  const [loading, setLoading] = useState(true)

  const doFetch = useCallback(
    (signal?: AbortSignal) => {
      setLoading(true)
      setError(undefined)
      apiCall(path, {
        ...init,
        signal,
      })
        .then(async (res) => {
          if (res.status < 200 || res.status >= 300) throw new Error(res.status.toString())
          try {
            return await res.json()
          } catch {
            return
          }
        })
        .then((json: T) => {
          setData(json)
          onSuccess?.(json)
        })
        .catch((error) => {
          setError(error)
          onError?.(error)
        })
        .finally(() => setLoading(false))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [path, JSON.stringify(init), onSuccess, onError],
  )

  useEffect(() => {
    const controller = new AbortController()
    doFetch(controller.signal)
    return () => controller.abort()
  }, [doFetch])

  return {data, loading, error, reload: doFetch}
}

export interface ExtendedPromise<T> extends PromiseLike<T> {
  status?: 'pending' | 'fulfilled' | 'rejected'
  value?: T
  reason?: unknown
}

export function use<T>(promise: ExtendedPromise<T>) {
  if (promise.status === 'fulfilled') {
    return promise.value
  } else if (promise.status === 'rejected') {
    throw promise.reason
  } else if (promise.status === 'pending') {
    throw promise
  } else {
    promise.status = 'pending'
    promise.then(
      (result) => {
        promise.status = 'fulfilled'
        promise.value = result
      },
      (reason) => {
        promise.status = 'rejected'
        promise.reason = reason
      },
    )
    throw promise as ExtendedPromise<T>
  }
}

interface UseSuspendedApiCallResult<T> {
  data: T
}

export function useSuspendedApiCall<T>(
  path: string,
  init?: RequestInit,
): UseSuspendedApiCallResult<T> {
  // TODO: implement proper cache management
  useEffect(() => {
    // invalidate cache every request
    return () => queueApiCacheInvalidation(path)
  }, [path])
  const promise = getApiCache(path, init)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return {data: use(promise)}
}
