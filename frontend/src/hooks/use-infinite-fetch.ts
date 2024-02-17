import {useCallback, useEffect, useRef, useState} from 'react'

export interface UseInfiniteFetchArg<TData, TPageParam> {
  queryFn: ({pageParam}: {pageParam: TPageParam}) => Promise<TData>
  initialPageParam: TPageParam
  getNextPageParam: ({pageParam}: {pageParam: TPageParam}) => TPageParam
}

export interface UseInfniteFetchReturn<TData> {
  fetchNextPage: () => Promise<unknown>
  data?: TData[]
  error?: unknown
  loading: boolean
}

export function useInfiniteFetch<TData, TPageParam>({
  queryFn,
  initialPageParam,
  getNextPageParam,
}: UseInfiniteFetchArg<TData, TPageParam>): UseInfniteFetchReturn<TData> {
  const [data, setData] = useState<TData[]>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>()
  const nextPageParamRef = useRef(initialPageParam)
  const getNextPageParamRef = useRef(getNextPageParam)

  const fetchNextPage = useCallback(async () => {
    setLoading(true)
    try {
      const res = await queryFn({pageParam: nextPageParamRef.current})
      setData((prev) => (prev ? prev : []).concat(res))
      setError(null)
    } catch (error) {
      setError(error)
    } finally {
      nextPageParamRef.current = getNextPageParamRef.current({pageParam: nextPageParamRef.current})
      setLoading(false)
    }
  }, [queryFn])

  useEffect(() => {
    fetchNextPage()
  }, [])

  return {fetchNextPage, data, loading, error}
}
