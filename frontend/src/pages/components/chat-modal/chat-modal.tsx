import {keyframes} from '@emotion/react'
import styled from '@emotion/styled'
import {useRef} from 'react'

import {Button} from '@/components/button'
import {Icon} from '@/components/icon'
import {useChatModal} from '@/providers'

import {ChatHome} from './chat-home'
import {ChatRoom} from './chat-room'

export function ChatModalContainer() {
  const {open, options, handleClose} = useChatModal()
  const chatModalRef = useRef<HTMLDivElement>(null)

  const onCloseClick = () => {
    if (chatModalRef.current === null) return handleClose()
    // outro animation
    const animation = chatModalRef.current.animate(
      [
        {
          opacity: 1,
          transform: 'translateY(0)',
        },
        {
          opacity: 0,
          transform: 'translateY(5rem)',
        },
      ],
      {easing: 'ease', duration: 500, fill: 'forwards'},
    )
    animation.addEventListener('finish', handleClose)
  }

  return (
    open && (
      <Container>
        <ChatModal ref={chatModalRef}>
          <Button
            bgColor="white"
            style={{width: 'auto', position: 'absolute', right: '0.5rem', top: '0.5rem'}}
            onClick={onCloseClick}
          >
            <Icon name="close" color="black" width="1.5rem" height="1.5rem" />
          </Button>
          {options.content === 'HOME' && <ChatHome />}
          {options.content === 'ROOM' && <ChatRoom userId={options.id} />}
        </ChatModal>
      </Container>
    )
  )
}

const Container = styled.div({
  position: 'fixed',
  bottom: 0,
  left: '8rem',
  padding: '1rem',
  width: '40rem',
  maxHeight: '80rem',
  height: '100%',
  zIndex: 2,
})

const ChatModal = styled.div(({theme}) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  backgroundColor: theme.color.white,
  padding: '1rem',
  overflow: 'hidden',
  borderRadius: '1.6rem',
  boxShadow: '0px 2px 20px 10px rgba(0, 0, 0, 0.1)',
  animation: `0.5s ease ${ChatModalIntroKeyFrame}`,
}))

const ChatModalIntroKeyFrame = keyframes`
  0%{
    opacity: 0;
    transform: translateY(5rem);
  }
  100%{
    opacity: 1;
    transform: translateY(0);
  }
`
