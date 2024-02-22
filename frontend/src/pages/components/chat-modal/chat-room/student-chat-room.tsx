import {Theme} from '@emotion/react'
import styled from '@emotion/styled'
import {Suspense, useRef} from 'react'

import {Flex} from '@/components/flex'
import {Icon} from '@/components/icon'
import {Loading} from '@/components/loading'
import {Typography} from '@/components/typography'
import {useSuspendedApiCall} from '@/hooks/use-api-call'
import {ChatRoomEnterResponse, useChatSocket} from '@/hooks/use-chat-socket'
import {useEnterKeydown} from '@/hooks/use-enter-keydown'
import {useChatModal} from '@/providers'
import {StudentInfoResponse} from '@/types/user-info'
import {sessionProvider} from '@/utils/session'
import {timestampToHHMM} from '@/utils/time'

import {ChatRoomLayout} from './chat-room-layout'

interface StudentChatRoomProps {
  studentId: number
}
export function StudentChatRoom({studentId}: StudentChatRoomProps) {
  const chat = useChatSocket(studentId)
  const chatModal = useChatModal()
  const inputRef = useRef<HTMLInputElement>(null)
  const {data} = useSuspendedApiCall<StudentInfoResponse>(`/students/${studentId}`)

  const handleSendMessage = () => {
    if (!inputRef.current) return
    const message = inputRef.current.value
    if (!message || !message.trim()) return
    chat.handleSendMessage({
      userId: sessionProvider.session?.id as number,
      userType: 'STUDENT',
      message,
    })
    inputRef.current.value = ''
    inputRef.current.focus()
  }

  useEnterKeydown(handleSendMessage)

  if (!data) return null
  const {name: studentName, studentImage} = data
  return (
    <ChatRoomLayout>
      <ChatRoomLayout.Header>
        <Flex justifyContent="space-between" alignItems="center" style={{padding: '2rem'}}>
          <Icon
            name="arrowBack"
            color="gray900"
            width="1.5rem"
            height="1.5rem"
            style={{cursor: 'pointer'}}
            onClick={() => {
              chatModal.handleOpen({content: 'HOME'})
            }}
          />
          <Typography size="2rem" weight="bold" color="gray900">
            {studentName}
          </Typography>
          <Icon
            name="close"
            color="gray900"
            width="1.5rem"
            height="1.5rem"
            style={{cursor: 'pointer'}}
            onClick={() => {
              chatModal.handleClose()
            }}
          />
        </Flex>
      </ChatRoomLayout.Header>

      <ChatRoomLayout.ChatList>
        <Suspense fallback={<Loading />}>
          <StudentDetail image={studentImage} name={studentName} />
        </Suspense>
        <Suspense>
          <StudentChatList
            studentId={studentId}
            name={studentName}
            image={studentImage}
            messages={chat.chatMessageList}
          />
        </Suspense>
      </ChatRoomLayout.ChatList>

      <ChatRoomLayout.Controls>
        <ChatInput placeholder="메세지를 입력해주세요" type="text" ref={inputRef} />
        <SendButton type="button" onClick={handleSendMessage}>
          <Icon color="white" name="paperAirplane" width="1.6rem" height="1.6rem" />
        </SendButton>
      </ChatRoomLayout.Controls>
    </ChatRoomLayout>
  )
}

interface StudentDetailProps {
  image: string
  name: string
}

function StudentDetail({image, name}: StudentDetailProps) {
  return (
    <Flex flexDirection="column" gap="0.5rem" alignItems="center">
      <Avartar src={image} width="8rem" height="8rem" />
      <Typography size="1.4rem" weight="normal" color="gray900">
        {name}
      </Typography>
    </Flex>
  )
}

function StudentChatList({
  studentId,
  name,
  image,
  messages,
}: {
  studentId: number
  name: string
  image: string
  messages: ChatRoomEnterResponse['chatMessageList']
}) {
  return (
    <ChatList>
      {messages === null || messages.length === 0 ? (
        <Flex
          justifyContent="center"
          alignItems="center"
          style={{margin: '7rem', textAlign: 'center'}}
        >
          <Typography size="2rem" weight="bold" color="gray500">
            {name}님과
            <br />
            대화를 시작해보세요!
          </Typography>
        </Flex>
      ) : (
        <>
          {messages.map((chat) => {
            if (chat.type !== 'TALK') return
            const {userId} = chat
            const isOther = userId === studentId
            return (
              <Flex
                as="li"
                key={chat.id}
                justifyContent={isOther ? 'flex-start' : 'flex-end'}
                style={{
                  paddingLeft: isOther ? '1rem' : 0,
                  paddingRight: isOther ? 0 : '1rem',
                }}
              >
                {isOther && (
                  <Avartar
                    style={{marginRight: '1rem'}}
                    alt={`${name}의 프로필 사진`}
                    src={image}
                    width="3.6rem"
                    height="3.6rem"
                  />
                )}
                <Flex flexDirection="column">
                  {isOther && (
                    <Typography weight="normal" size="1.2rem" color="gray500">
                      {name}
                    </Typography>
                  )}
                  <Flex gap="0.5rem" flexDirection={isOther ? 'row' : 'row-reverse'}>
                    <ChatMessage
                      bgColor={isOther ? 'gray200' : 'primary'}
                      color={isOther ? 'gray900' : 'white'}
                    >
                      {chat.message}
                    </ChatMessage>
                    <ChatTime>{timestampToHHMM(chat.timestamp)}</ChatTime>
                  </Flex>
                </Flex>
              </Flex>
            )
          })}
        </>
      )}
    </ChatList>
  )
}

const ChatList = styled.ul(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  padding: '2rem 0',
  gap: '1rem',
}))

const Avartar = styled.img(({width, height}) => ({
  borderRadius: '50%',
  width,
  height,
}))

const ChatMessage = styled.div<{bgColor: keyof Theme['color']; color: keyof Theme['color']}>(
  ({theme, bgColor, color}) => ({
    padding: '1rem',
    fontSize: '1.4rem',
    backgroundColor: theme.color[bgColor],
    color: color,
    borderRadius: '0.8rem',
  }),
)

const ChatTime = styled.span(({theme}) => ({
  fontSize: '1.2rem',
  color: theme.color.gray700,
  alignSelf: 'flex-end',
}))

const ChatInput = styled.input(({theme}) => ({
  backgroundColor: theme.color.gray200,
  flex: '1 1 0',
  borderRadius: '99px',
  fontSize: '1.4rem',
  padding: '0.7rem 2rem',
}))

const SendButton = styled.button(({theme}) => ({
  borderRadius: '50%',
  backgroundColor: theme.color.primary,
  padding: '1rem',
}))
