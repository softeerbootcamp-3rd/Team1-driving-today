import {useCallback, useEffect, useState} from 'react'

interface UseFetchResult<T> {
  data?: T
  error?: number
  loading: boolean
  reload: () => void
}

interface UseFetchCallbacks<T> {
  onSuccess: (data: T) => void
  onError: (errorCode: number) => void
}

interface UseFetchParam<T> {
  init?: RequestInit
  callbacks?: UseFetchCallbacks<T>
}

const UnknownError = -1

export function useFetch<T>(url: string, {init, callbacks}: UseFetchParam<T>): UseFetchResult<T> {
  const [data, setData] = useState<T>()
  const [error, setError] = useState<number>()
  const [loading, setLoading] = useState(true)

  const doFetch = useCallback(
    (signal?: AbortSignal) => {
      setLoading(true)
      setError(undefined)
      fetch(url, {...init, signal})
        .then(async (res) => {
          if (res.status < 200 || res.status >= 300) throw res.status
          try {
            return await res.json()
          } catch {
            return undefined
          }
        })
        .then((json: T) => {
          setData(json)
          callbacks?.onSuccess?.(json)
        })
        .catch((error: number) => {
          if (isNaN(error)) {
            setError(UnknownError)
            return
          }
          setError(error)
          callbacks?.onError?.(error)
        })
        .finally(() => setLoading(false))
    },
    [url, init, callbacks],
  )

  useEffect(() => {
    const controller = new AbortController()
    doFetch(controller.signal)
    return () => controller.abort()
  }, [doFetch])

  return {data, loading, error, reload: doFetch}
}
