import {useState} from 'react'

interface UseInfiniteFetchArg {
  initialParams: unknown
  getNextPageParams: () => void
}

interface UseInfniteFetchReturn<TData> {
  fetchNextPage: () => void
  data?: TData
  error?: unknown
  loading: boolean
}

export function useInfiniteFetch<TData>(arg: UseInfiniteFetchArg): UseInfniteFetchReturn<TData> {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const fetchNextPage = () => {}
  return {fetchNextPage, data, loading, error}
}
