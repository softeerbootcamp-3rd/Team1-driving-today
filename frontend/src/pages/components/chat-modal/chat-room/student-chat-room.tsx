import {Suspense, useCallback, useEffect, useRef} from 'react'

import {Flex} from '@/components/flex'
import {Icon} from '@/components/icon'
import {Loading} from '@/components/loading'
import {Typography} from '@/components/typography'
import {useSuspendedApiCall} from '@/hooks/use-api-call'
import {ChatRoomEnterResponse, useChatSocket} from '@/hooks/use-chat-socket'
import {useEnterKeypress} from '@/hooks/use-enter-keypress'
import {useChatModal} from '@/providers'
import {StudentInfoResponse} from '@/types/user-info'
import {sessionProvider} from '@/utils/session'
import {isDifferenceOneDay, timestampToHHMM} from '@/utils/time'

import {ChatRoomLayout} from './chat-room-layout'
import {Avartar, ChatInput, ChatList, ChatMessage, ChatTime, SendButton, TimeStemp} from './styles'

interface StudentChatRoomProps {
  studentId: number
}
export function StudentChatRoom({studentId}: StudentChatRoomProps) {
  const chat = useChatSocket(studentId)
  const chatModal = useChatModal()
  const inputRef = useRef<HTMLInputElement>(null)
  const {data} = useSuspendedApiCall<StudentInfoResponse>(`/students/${studentId}`)
  const scrolledRef = useRef<HTMLDivElement>(null)

  const handleSendMessage = useCallback(() => {
    const chatInputEle = inputRef.current
    const scrolledEle = scrolledRef.current
    if (!chatInputEle || !scrolledEle) return
    const message = chatInputEle.value
    if (!message || !message.trim()) return
    chat.handleSendMessage({
      userId: sessionProvider.session?.id as number,
      userType: 'STUDENT',
      message,
    })
    chatInputEle.value = ''
    chatInputEle.focus()
    scrolledEle.scrollTo(0, scrolledEle.scrollHeight)
  }, [chat])

  useEffect(() => {
    const scrolledEle = scrolledRef.current
    if (!scrolledEle) return
    if (chat.chatMessageList?.length !== 0) {
      scrolledEle.scrollTo(0, scrolledEle.scrollHeight)
    }
  }, [chat])

  useEnterKeypress(handleSendMessage)

  if (!data) return null
  const {name: studentName, studentImage} = data
  return (
    <ChatRoomLayout ref={scrolledRef}>
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
          {messages.map((chat, index, currentMessages) => {
            const isOther = chat.userId === studentId
            const isDay =
              index === 0 ||
              isDifferenceOneDay(chat.timestamp, currentMessages[index - 1].timestamp)
            return (
              <>
                {isDay && (
                  <TimeStemp>
                    <div>{new Date(chat.timestamp).toLocaleDateString()}</div>
                  </TimeStemp>
                )}
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
              </>
            )
          })}
        </>
      )}
    </ChatList>
  )
}
