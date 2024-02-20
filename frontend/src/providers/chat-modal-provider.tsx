import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

import {useModal} from '@/hooks/use-modal'

export type ChatModalOptions = {content: 'HOME'} | {content: 'ROOM'; id: number}
export interface ChatModalContextType {
  open: boolean
  handleOpen: (options: ChatModalOptions) => void
  handleClose: () => void
  options: ChatModalOptions
}

const ChatModalContext = createContext<ChatModalContextType | null>(null)

const initialOptions: ChatModalOptions = {
  content: 'HOME',
}
export function ChatModalProvider({children}: PropsWithChildren) {
  const modal = useModal()
  const [options, setOptions] = useState<ChatModalOptions>(initialOptions)

  const handleOpen = useCallback(
    (options: ChatModalOptions) => {
      modal.onOpen()
      setOptions(options)
    },
    [modal],
  )

  const handleClose = useCallback(() => {
    modal.onClose()
    setOptions(initialOptions)
  }, [modal])

  const context = useMemo(
    () => ({
      open: modal.open,
      handleOpen,
      handleClose,
      options,
    }),
    [options, modal, handleClose, handleOpen],
  )
  return <ChatModalContext.Provider value={context}>{children}</ChatModalContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useChatModal() {
  const modal = useContext(ChatModalContext)

  if (!modal) {
    throw new Error('useChatModal should be used in ChatModalProvider')
  }

  return modal
}
