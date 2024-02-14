import {useCallback, useEffect, useState} from 'react'

interface UseFetchResult<T> {
  data?: T
  error?: unknown
  loading: boolean
  reload: () => void
}

interface UseFetchCallbacks<T> {
  onSuccess?: (data: T) => void
  onError?: (errorCode: number) => void
}

type UseFetchParam<T> = Omit<RequestInit, 'signal'> & UseFetchCallbacks<T>

export function useFetch<T>(url: string, params: UseFetchParam<T>): UseFetchResult<T> {
  const {onSuccess, onError, ...init} = params
  const [data, setData] = useState<T>()
  const [error, setError] = useState<unknown>()
  const [loading, setLoading] = useState(true)

  const doFetch = useCallback(
    (signal?: AbortSignal) => {
      setLoading(true)
      setError(undefined)
      fetch(url, {...init, signal})
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
    [url, init, onSuccess, onError],
  )

  useEffect(() => {
    const controller = new AbortController()
    doFetch(controller.signal)
    return () => controller.abort()
  }, [doFetch])

  return {data, loading, error, reload: doFetch}
}
