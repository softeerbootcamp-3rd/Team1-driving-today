import {ReactNode} from 'react'

import {Flex} from '@/components/flex'
import {ChatMessageHistory} from '@/hooks/use-chat-socket'
import {timestampToHHMM} from '@/utils/time'

import {ChatMessage, ChatTime} from './styles'

interface ChatItemProps {
  position: 'left' | 'right'
  avartar?: ReactNode
  sender?: ReactNode
  chat: ChatMessageHistory
}

export function ChatItem({position, sender, avartar, chat}: ChatItemProps) {
  const isLeft = position === 'left'
  return (
    <Flex
      as="li"
      justifyContent={isLeft ? 'flex-start' : 'flex-end'}
      style={{
        paddingLeft: isLeft ? '1rem' : 0,
        paddingRight: isLeft ? 0 : '1rem',
      }}
    >
      {isLeft && avartar}
      <Flex flexDirection="column">
        {isLeft && sender}
        <Flex gap="0.5rem" flexDirection={isLeft ? 'row' : 'row-reverse'}>
          <ChatMessage
            bgColor={isLeft ? 'gray200' : 'primary'}
            color={isLeft ? 'gray900' : 'white'}
          >
            {chat.message}
          </ChatMessage>
          <ChatTime>{timestampToHHMM(chat.timestamp)}</ChatTime>
        </Flex>
      </Flex>
    </Flex>
  )
}
