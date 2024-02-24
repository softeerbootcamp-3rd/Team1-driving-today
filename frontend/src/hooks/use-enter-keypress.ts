import {useCallback, useEffect} from 'react'

export type UseEnterKeypressCallback = (...arg: unknown[]) => unknown

export function useEnterKeypress(callback: UseEnterKeypressCallback = () => {}) {
  const handleKeypress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        callback?.()
      }
    },
    [callback],
  )

  useEffect(() => {
    window.addEventListener('keypress', handleKeypress)
    return () => {
      window.removeEventListener('keypress', handleKeypress)
    }
  }, [handleKeypress])
}
