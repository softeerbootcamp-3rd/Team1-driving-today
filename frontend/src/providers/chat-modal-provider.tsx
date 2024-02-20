import {createContext, type PropsWithChildren, useContext} from 'react'

import {useModal, type UseModalReturn} from '@/hooks/use-modal'

const ChatModalContext = createContext<UseModalReturn | null>(null)

export function ChatModalProvider({children}: PropsWithChildren) {
  const modal = useModal()

  return <ChatModalContext.Provider value={modal}>{children}</ChatModalContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useChatModal() {
  const modal = useContext(ChatModalContext)

  if (!modal) {
    throw new Error('useChatModal should be used in ChatModalProvider')
  }

  return modal
}
