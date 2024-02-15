import {useEffect, useRef} from 'react'

type UseIntersectionObserverCallback = () => void

export function useIntersectionObserver(
  callback: UseIntersectionObserverCallback,
  options?: IntersectionObserverInit,
) {
  const ref = useRef<HTMLElement>(null)
  const callbackRef = useRef(callback)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(() => {
      callbackRef.current()
    }, options)

    observer.observe(ref.current)

    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(options)])

  return ref
}
