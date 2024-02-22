import {Theme} from '@emotion/react'
import styled from '@emotion/styled'
import {Suspense, useRef} from 'react'

import {Button} from '@/components/button'
import {Flex} from '@/components/flex'
import {Icon} from '@/components/icon'
import {Loading} from '@/components/loading'
import {Typography} from '@/components/typography'
import {useSuspendedApiCall} from '@/hooks/use-api-call'
import {type ChatMessageHistory, useChatSocket} from '@/hooks/use-chat-socket'
import {useChatModal} from '@/providers'
import {InstructorInfoResponse} from '@/types/user-info'
import {sessionProvider} from '@/utils/session'
import {timestampToHHMM} from '@/utils/time'

interface InstructorChatRoomProps {
  instructorId: number
}
export function InstructorChatRoom({instructorId}: InstructorChatRoomProps) {
  // 1. 강사 정보
  // 2. 입장 요청
  // 소켓 연결
  const chat = useChatSocket(instructorId)
  const chatModal = useChatModal()
  const inputRef = useRef<HTMLInputElement>(null)
  const messages = dummyData.chatMessageList

  const handleSendMessage = () => {
    if (!inputRef.current) return
    const message = inputRef.current.value
    if (!message || !message.trim()) return
    chat.handleSendMessage({
      userId: sessionProvider.session?.id as number,
      userType: 'STUDENT',
      message,
    })
    inputRef.current.focus()
  }

  return (
    <div style={{position: 'absolute', inset: 0, overflow: 'hidden scroll'}}>
      <header style={{position: 'absolute', top: 0, right: 0, left: 0, zIndex: 1030}}>
        <Button
          onClick={() => {
            console.log('quit')
            chatModal.handleOpen({content: 'HOME'})
          }}
        >
          나가기
        </Button>
      </header>

      <div style={{minHeight: 'calc(100% - 6rem)'}}>
        <div style={{position: 'relative', overflow: 'hidden', paddingTop: '6rem', width: '100%'}}>
          <div style={{width: '100%', height: 'auto', transform: 'translate(0px)'}}>
            <section style={{position: 'relative', height: 'auto'}}>
              <Suspense fallback={<Loading />}>
                <InstructorDetail instructorId={instructorId} />
              </Suspense>
              <Suspense>
                <InstructorChatList instructorId={instructorId} messages={chat.messages} />
              </Suspense>
            </section>
          </div>
        </div>
      </div>

      <ChatControlContainer>
        <ChatInput placeholder="메세지를 입력해주세요" type="text" ref={inputRef} />
        <SendButton type="button" onClick={handleSendMessage}>
          <Icon color="white" name="paperAirplane" width="1.6rem" height="1.6rem" />
        </SendButton>
      </ChatControlContainer>
    </div>
  )
}

function InstructorDetail({instructorId}: {instructorId: number}) {
  const {data} = useSuspendedApiCall<InstructorInfoResponse>(`/instructors/${instructorId}`)

  return (
    <Flex flexDirection="column" gap="0.5rem" alignItems="center">
      <Avartar src={data?.instructorInfo.instructorImage} width="8rem" height="8rem" />
      <Typography size="1.4rem" weight="normal" color="gray900">
        {data?.instructorInfo.name}
      </Typography>
      <Flex gap="0.5rem" alignItems="center">
        <Icon name="building" width="1.6rem" height="1.6rem" color="gray500" />
        <Typography size="1.4rem" weight="normal" color="gray900">
          {data?.academyInfo.name}
        </Typography>
      </Flex>
      <Flex gap="0.5rem" alignItems="center">
        <Icon name="star" width="1.6rem" height="1.6rem" color="gray500" />
        <Typography size="1.4rem" weight="normal" color="gray900">
          {data?.averageRating.toPrecision(2)}
        </Typography>
      </Flex>
    </Flex>
  )
}

function InstructorChatList({
  instructorId,
  messages,
}: {
  instructorId: number
  messages: ChatMessageHistory[]
}) {
  const {data} = useSuspendedApiCall<InstructorInfoResponse>(`/instructors/${instructorId}`)
  const dummyMessages = dummyData.chatMessageList
  console.log('InstructorChatList: ', messages)

  return (
    <ChatList>
      {(dummyMessages === null || dummyMessages.length === 0) && (
        <Typography size="2.4rem" weight="bold" color="gray900">
          대화를 시작해보세요!
        </Typography>
      )}
      {dummyMessages.map((chat) => {
        const {userId} = chat
        const isOther = userId === instructorId
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
                alt={`${data?.instructorInfo.name}의 프로필 사진`}
                // src={data?.instructorInfo.instructorImage}
                src="https://picsum.photos/200"
                width="3.6rem"
                height="3.6rem"
              />
            )}
            <Flex flexDirection="column">
              {isOther && (
                <Typography weight="normal" size="1.2rem" color="gray500">
                  {data?.instructorInfo.name}
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

const ChatControlContainer = styled.div(({theme}) => ({
  position: 'sticky',
  gap: '1rem',
  display: 'flex',
  bottom: 0,
  width: '100%',
  right: 0,
  left: 0,
  zIndex: 1030,
  padding: '1rem',
  backgroundColor: theme.color.white,
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
const dummyData = {
  chatRoomInfo: {
    roodId: 1,
    studentId: 2,
    instructorId: 3,
  },
  chatMessageList: [
    {
      id: new Date().getTime() - 900000,
      timestamp: new Date().getTime() - 900000,
      type: 'TALK',
      roomId: 1,
      sender: sessionProvider.getAccessToken(),
      message: 'hello world',
      userId: 2,
      userType: 'STUDENT',
    },
    {
      id: new Date().getTime() - 600000,
      timestamp: new Date().getTime() - 600000,
      type: 'TALK',
      roomId: 1,
      sender: sessionProvider.getAccessToken(),
      message: 'hello world',
      userId: 3,
      userType: 'INSTRUCTOR',
    },
    {
      id: new Date().getTime() - 300000,
      timestamp: new Date().getTime() - 300000,
      type: 'TALK',
      roomId: 1,
      sender: sessionProvider.getAccessToken(),
      message: 'ojj1123',
      userId: 2,
      userType: 'STUDENT',
    },
    {
      id: new Date().getTime(),
      timestamp: new Date().getTime(),
      type: 'TALK',
      roomId: 1,
      sender: sessionProvider.getAccessToken(),
      message: 'hihi3',
      userId: 2,
      userType: 'STUDENT',
    },
    {
      id: new Date().getTime(),
      timestamp: new Date().getTime(),
      type: 'TALK',
      roomId: 1,
      sender: sessionProvider.getAccessToken(),
      message: 'hihi3',
      userId: 2,
      userType: 'STUDENT',
    },
    {
      id: new Date().getTime(),
      timestamp: new Date().getTime(),
      type: 'TALK',
      roomId: 1,
      sender: sessionProvider.getAccessToken(),
      message: 'hihi3',
      userId: 2,
      userType: 'STUDENT',
    },
    {
      id: new Date().getTime(),
      timestamp: new Date().getTime(),
      type: 'TALK',
      roomId: 1,
      sender: sessionProvider.getAccessToken(),
      message: 'hihi3',
      userId: 2,
      userType: 'STUDENT',
    },
    {
      id: new Date().getTime(),
      timestamp: new Date().getTime(),
      type: 'TALK',
      roomId: 1,
      sender: sessionProvider.getAccessToken(),
      message: 'hihi3',
      userId: 2,
      userType: 'STUDENT',
    },
    {
      id: new Date().getTime(),
      timestamp: new Date().getTime(),
      type: 'TALK',
      roomId: 1,
      sender: sessionProvider.getAccessToken(),
      message: 'hihi3',
      userId: 2,
      userType: 'STUDENT',
    },
    {
      id: new Date().getTime(),
      timestamp: new Date().getTime(),
      type: 'TALK',
      roomId: 1,
      sender: sessionProvider.getAccessToken(),
      message: 'hihi3',
      userId: 2,
      userType: 'STUDENT',
    },
    {
      id: new Date().getTime(),
      timestamp: new Date().getTime(),
      type: 'TALK',
      roomId: 1,
      sender: sessionProvider.getAccessToken(),
      message: 'hihi3',
      userId: 2,
      userType: 'STUDENT',
    },
    {
      id: new Date().getTime(),
      timestamp: new Date().getTime(),
      type: 'TALK',
      roomId: 1,
      sender: sessionProvider.getAccessToken(),
      message: 'hihi3',
      userId: 2,
      userType: 'STUDENT',
    },
    {
      id: new Date().getTime(),
      timestamp: new Date().getTime(),
      type: 'TALK',
      roomId: 1,
      sender: sessionProvider.getAccessToken(),
      message: 'hihi3',
      userId: 2,
      userType: 'STUDENT',
    },
    {
      id: new Date().getTime(),
      timestamp: new Date().getTime(),
      type: 'TALK',
      roomId: 1,
      sender: sessionProvider.getAccessToken(),
      message: 'hihi3',
      userId: 2,
      userType: 'STUDENT',
    },
    {
      id: new Date().getTime(),
      timestamp: new Date().getTime(),
      type: 'TALK',
      roomId: 1,
      sender: sessionProvider.getAccessToken(),
      message: 'hihi3',
      userId: 2,
      userType: 'STUDENT',
    },
    {
      id: new Date().getTime(),
      timestamp: new Date().getTime(),
      type: 'TALK',
      roomId: 1,
      sender: sessionProvider.getAccessToken(),
      message: 'hihi3',
      userId: 2,
      userType: 'STUDENT',
    },
    {
      id: new Date().getTime(),
      timestamp: new Date().getTime(),
      type: 'TALK',
      roomId: 1,
      sender: sessionProvider.getAccessToken(),
      message: 'hihi3',
      userId: 2,
      userType: 'STUDENT',
    },
    {
      id: new Date().getTime(),
      timestamp: new Date().getTime(),
      type: 'TALK',
      roomId: 1,
      sender: sessionProvider.getAccessToken(),
      message: 'hihi3',
      userId: 2,
      userType: 'STUDENT',
    },
    {
      id: new Date().getTime(),
      timestamp: new Date().getTime(),
      type: 'TALK',
      roomId: 1,
      sender: sessionProvider.getAccessToken(),
      message: 'hihi3',
      userId: 2,
      userType: 'STUDENT',
    },
    {
      id: new Date().getTime(),
      timestamp: new Date().getTime(),
      type: 'TALK',
      roomId: 1,
      sender: sessionProvider.getAccessToken(),
      message: 'hihi3',
      userId: 2,
      userType: 'STUDENT',
    },
    {
      id: new Date().getTime(),
      timestamp: new Date().getTime(),
      type: 'TALK',
      roomId: 1,
      sender: sessionProvider.getAccessToken(),
      message: 'hihi3',
      userId: 2,
      userType: 'STUDENT',
    },
  ],
}
