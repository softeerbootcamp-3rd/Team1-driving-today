import {useEffect, useRef} from 'react'

type UseIntersectionObserverCallback = (entry: IntersectionObserverEntry) => void

export function useIntersectionObserver(
  callback: UseIntersectionObserverCallback,
  options?: IntersectionObserverInit,
) {
  const ref = useRef(null)
  const callbackRef = useRef(callback)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callbackRef.current(entry)
        }
      })
    }, options)

    observer.observe(ref.current)

    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(options)])

  return ref
}
