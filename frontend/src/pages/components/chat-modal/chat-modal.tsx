import styled from '@emotion/styled'

import {useChatModal} from '@/providers'

export function ChatModalContainer() {
  const {open, options, handleClose} = useChatModal()
  return (
    <div id="chat-modal">
      {open && (
        <ChatModal>
          Chat modal
          {options.content === 'HOME' && <>home</>}
          {options.content === 'ROOM' && <>room</>}
          <button onClick={handleClose}>close modal</button>
        </ChatModal>
      )}
    </div>
  )
}

const ChatModal = styled.div(() => ({}))
