import {useCallback, useMemo, useRef, useState} from 'react'

export interface UseInfiniteFetchArg<TData, TPageParam> {
  queryFn: ({pageParam}: {pageParam: TPageParam}) => Promise<TData>
  initialPageParam: TPageParam
  getNextPageParam: ({
    pageParam,
    lastPage,
  }: {
    pageParam: TPageParam
    lastPage: TData
  }) => TPageParam | undefined
}

export interface UseInfniteFetchReturn<TData> {
  fetchNextPage: () => Promise<unknown>
  data?: TData[]
  error?: unknown
  loading: boolean
  hasNextPageParam: boolean
}

export function useInfiniteFetch<TData, TPageParam>({
  queryFn,
  initialPageParam,
  getNextPageParam,
}: UseInfiniteFetchArg<TData, TPageParam>): UseInfniteFetchReturn<TData> {
  const [data, setData] = useState<TData[]>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>()
  const [hasNextPageParam, setHasNextPageParam] = useState(true)
  const queryFnRef = useRef(queryFn)
  const nextPageParamRef = useRef<TPageParam | undefined>(initialPageParam)
  const getNextPageParamRef = useRef(getNextPageParam)

  const fetchNextPage = useCallback(async () => {
    if (!nextPageParamRef.current) {
      return
    }
    setLoading(true)
    try {
      const res = await queryFnRef.current({pageParam: nextPageParamRef.current})
      nextPageParamRef.current = getNextPageParamRef.current({
        pageParam: nextPageParamRef.current,
        lastPage: res,
      })
      if (!nextPageParamRef.current) {
        setHasNextPageParam(false)
      }
      setData((prev) => (prev ? prev : []).concat(res))
      setError(null)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [])

  return useMemo(() => {
    return {fetchNextPage, data, loading, error, hasNextPageParam}
  }, [fetchNextPage, data, loading, error, hasNextPageParam])
}
