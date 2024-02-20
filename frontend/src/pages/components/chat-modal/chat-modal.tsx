import styled from '@emotion/styled'

import {Portal} from '@/components/portal'

interface ChatModal {
  open: boolean
  onClose: () => void
}

export function ChatModal({open, onClose}: ChatModal) {
  return (
    <Portal id="chat-modal">
      {open && (
        <ChatModalContainer>
          Chat modal
          <button onClick={onClose}>close modal</button>
        </ChatModalContainer>
      )}
    </Portal>
  )
}

const ChatModalContainer = styled.div(() => ({}))
