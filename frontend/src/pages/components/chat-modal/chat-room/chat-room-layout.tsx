import styled from '@emotion/styled'
import {PropsWithChildren} from 'react'

const ChatRoomRoot = styled.div(() => ({
  position: 'absolute',
  inset: 0,
  overflow: 'hidden scroll',
}))

const Header = styled.header(() => ({
  position: 'sticky',
  top: 0,
  right: 0,
  left: 0,
  zIndex: 1030,
  backgroundColor: 'white',
}))

function ChatList({children}: PropsWithChildren) {
  return (
    <div style={{minHeight: 'calc(100% - 10rem)'}}>
      <div style={{position: 'relative', overflow: 'hidden', width: '100%'}}>
        <div style={{width: '100%', height: 'auto', transform: 'translate(0px)'}}>
          <section style={{position: 'relative', height: 'auto'}}>{children}</section>
        </div>
      </div>
    </div>
  )
}

const ChatControls = styled.div(({theme}) => ({
  position: 'sticky',
  gap: '1rem',
  display: 'flex',
  bottom: 0,
  width: '100%',
  right: 0,
  left: 0,
  zIndex: 1030,
  padding: '1rem 1rem 2rem 1rem',
  backgroundColor: theme.color.white,
  borderTop: `1px solid ${theme.color.gray200}`,
}))

export const ChatRoomLayout = Object.assign(ChatRoomRoot, {
  Header,
  ChatList,
  Controls: ChatControls,
})
