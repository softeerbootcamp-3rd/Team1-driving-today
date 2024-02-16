import {useEffect, useState} from 'react'

interface UseInfiniteFetchArg<TData, TError, TPageParams> {
  queryFn: ({pageParam}: {pageParam: TPageParams}) => Promise<TData>
  initialParams: TPageParams
  getNextPageParams: ({pageParam}: {pageParam: TPageParams}) => TPageParams | undefined | null
}

interface UseInfniteFetchReturn<TData> {
  fetchNextPage: () => Promise<unknown>
  data?: TData
  error?: unknown
  loading: boolean
}

export function useInfiniteFetch<TData, TError, TPageParams>({
  queryFn,
  initialParams,
  getNextpageParams,
}: UseInfiniteFetchArg<TData, TError, TPageParams>): UseInfniteFetchReturn<TData> {
  const [data, setData] = useState<TData>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const nextParams = initialParams

  const fetchNextPage = async () => {
    try {
      const data = await queryFn({pageParam: nextParams})
    } catch (error) {}
  }

  useEffect(() => {
    const abortController = new AbortController()
  }, [])

  return {fetchNextPage, data, loading, error}
}
