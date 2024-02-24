import {RefObject, useCallback, useEffect, useMemo, useRef, useState} from 'react'

export interface UseInfiniteFetchArg<TDataArray, TPageParam> {
  queryFn: ({pageParam}: {pageParam: TPageParam}) => Promise<TDataArray>
  initialPageParam: TPageParam
  getNextPageParam: ({
    pageParam,
    lastPage,
  }: {
    pageParam: TPageParam
    lastPage: TDataArray
  }) => TPageParam | undefined
}

export interface UseInfniteFetchReturn<TDataArray> {
  fetchNextPage: () => Promise<unknown>
  data?: TDataArray
  error?: unknown
  loading: boolean
  hasNextPage: boolean
}

export function useInfiniteFetch<TData, TPageParam = unknown>({
  queryFn,
  initialPageParam,
  getNextPageParam,
}: UseInfiniteFetchArg<TData[], TPageParam>): UseInfniteFetchReturn<TData[]> {
  const [data, setData] = useState<TData[]>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>()
  const [hasNextPage, setHasNextPage] = useState(true)
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
        setHasNextPage(false)
      }
      setData((prev) => (prev ?? []).concat(res))
      setError(null)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [])

  return useMemo(
    () => ({fetchNextPage, data, loading, error, hasNextPage}),
    [fetchNextPage, data, loading, error, hasNextPage],
  )
}

// todo: this is temporary fix
// queryFn이 바뀌면 infiniteFetch의 context 또한 초기화 되어야 합니다
export function useResetableInfiniteFetch<TData, TPageParam = unknown>({
  queryFn,
  initialPageParam,
  getNextPageParam,
}: UseInfiniteFetchArg<TData[], TPageParam>): UseInfniteFetchReturn<TData[]> {
  const [data, setData] = useState<TData[]>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>()
  const [hasNextPage, setHasNextPage] = useState(true)
  const nextPageParamRef = useRef<TPageParam | undefined>(initialPageParam)

  const fetchNextPage = useCallback(async () => {
    if (!nextPageParamRef.current) {
      return
    }
    setLoading(true)
    try {
      const res = await queryFn({pageParam: nextPageParamRef.current})
      nextPageParamRef.current = getNextPageParam({
        pageParam: nextPageParamRef.current,
        lastPage: res,
      })
      if (!nextPageParamRef.current) {
        setHasNextPage(false)
      }
      setData((prev) => (prev ?? []).concat(res))
      setError(null)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [getNextPageParam, queryFn])

  useEffect(() => {
    return () => {
      setData([])
      setLoading(false)
      setError(undefined)
      setHasNextPage(true)
      nextPageParamRef.current = initialPageParam
    }
  }, [initialPageParam, queryFn])

  return {fetchNextPage, data, loading, error, hasNextPage}
}
