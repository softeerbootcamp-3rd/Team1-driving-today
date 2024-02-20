import {useCallback, useMemo, useState} from 'react'

export interface UseModalReturn {
  open: boolean
  onOpen: () => void
  onClose: () => void
}

export function useModal(initialOpen = false): UseModalReturn {
  const [open, setOpen] = useState(initialOpen)

  const onOpen = useCallback(() => setOpen(true), [])
  const onClose = useCallback(() => setOpen(false), [])

  return useMemo(
    () => ({
      open,
      onOpen,
      onClose,
    }),
    [open, onOpen, onClose],
  )
}
