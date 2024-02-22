import {useCallback, useEffect} from 'react'

export type UseEscapeKeydownCallback = (...arg: unknown[]) => unknown

export function useEscapeKeydown(callback: UseEscapeKeydownCallback = () => {}) {
  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        callback?.()
      }
    },
    [callback],
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown)
    return () => {
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [handleKeydown])
}
