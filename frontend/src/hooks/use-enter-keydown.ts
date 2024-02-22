import {useCallback, useEffect} from 'react'

export type UseEnterKeydownCallback = (...arg: unknown[]) => unknown

export function useEnterKeydown(callback: UseEnterKeydownCallback = () => {}) {
  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
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
