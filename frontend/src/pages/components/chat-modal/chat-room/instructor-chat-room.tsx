import {Theme} from '@emotion/react'
import styled from '@emotion/styled'
import {Fragment, Suspense, useCallback, useEffect, useRef} from 'react'

import {Flex} from '@/components/flex'
import {Icon} from '@/components/icon'
import {Loading} from '@/components/loading'
import {Typography} from '@/components/typography'
import {useSuspendedApiCall} from '@/hooks/use-api-call'
import {ChatRoomEnterResponse, useChatSocket} from '@/hooks/use-chat-socket'
import {useEnterKeypress} from '@/hooks/use-enter-keypress'
import {useChatModal} from '@/providers'
import {InstructorInfoResponse} from '@/types/user-info'
import {sessionProvider} from '@/utils/session'
import {isDifferenceOneDay, timestampToHHMM} from '@/utils/time'

import {ChatRoomLayout} from './chat-room-layout'

interface InstructorChatRoomProps {
  instructorId: number
}
export function InstructorChatRoom({instructorId}: InstructorChatRoomProps) {
  const chat = useChatSocket(instructorId)
  const chatModal = useChatModal()
  const inputRef = useRef<HTMLInputElement>(null)
  const {data} = useSuspendedApiCall<InstructorInfoResponse>(`/instructors/${instructorId}`)
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
  const {academyInfo, instructorInfo, averageRating} = data
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
            {instructorInfo.name}
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
          <InstructorDetail
            academyName={academyInfo.name}
            image={instructorInfo.instructorImage}
            name={instructorInfo.name}
            averageRating={averageRating}
          />
        </Suspense>
        <Suspense>
          <InstructorChatList
            instructorId={instructorId}
            instructorName={instructorInfo.name}
            instuctorImage={instructorInfo.instructorImage}
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

interface IntroctorDetailProps {
  image: string
  name: string
  academyName: string
  averageRating: number
}

function InstructorDetail({image, name, academyName, averageRating}: IntroctorDetailProps) {
  return (
    <Flex flexDirection="column" gap="0.5rem" alignItems="center">
      <Avartar src={image} width="8rem" height="8rem" />
      <Typography size="1.4rem" weight="normal" color="gray900">
        {name}
      </Typography>
      <Flex gap="0.5rem" alignItems="center">
        <Icon name="building" width="1.6rem" height="1.6rem" color="gray500" />
        <Typography size="1.4rem" weight="normal" color="gray900">
          {academyName}
        </Typography>
      </Flex>
      <Flex gap="0.5rem" alignItems="center">
        <Icon name="star" width="1.6rem" height="1.6rem" color="gray500" />
        <Typography size="1.4rem" weight="normal" color="gray900">
          {averageRating?.toPrecision(2)}
        </Typography>
      </Flex>
    </Flex>
  )
}

function InstructorChatList({
  instructorId,
  instructorName,
  instuctorImage,
  messages,
}: {
  instructorId: number
  instructorName: string
  instuctorImage: string
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
            {instructorName}님과
            <br />
            대화를 시작해보세요!
          </Typography>
        </Flex>
      ) : (
        <>
          {messages.map((chat, index, currentMessages) => {
            if (chat.type !== 'TALK') return
            const isOther = chat.userId === instructorId
            const isDay =
              index === 0 ||
              isDifferenceOneDay(chat.timestamp, currentMessages[index - 1].timestamp)
            return (
              <Fragment key={chat.id}>
                {isDay && (
                  <TimeStemp>
                    <div>{new Date(chat.timestamp).toLocaleDateString()}</div>
                  </TimeStemp>
                )}
                <Flex
                  as="li"
                  justifyContent={isOther ? 'flex-start' : 'flex-end'}
                  style={{
                    paddingLeft: isOther ? '1rem' : 0,
                    paddingRight: isOther ? 0 : '1rem',
                  }}
                >
                  {isOther && (
                    <Avartar
                      style={{marginRight: '1rem'}}
                      alt={`${instructorName}의 프로필 사진`}
                      src={instuctorImage}
                      width="3.6rem"
                      height="3.6rem"
                    />
                  )}
                  <Flex flexDirection="column">
                    {isOther && (
                      <Typography weight="normal" size="1.2rem" color="gray500">
                        {instructorName}
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
              </Fragment>
            )
          })}
        </>
      )}
    </ChatList>
  )
}

const TimeStemp = styled.li(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  '& > div': {
    borderRadius: '9999px',
    textAlign: 'center',
    border: `1px solid ${theme.color.gray300}`,
    backgroundColor: theme.color.white,
    color: theme.color.gray900,
    fontSize: '1.4rem',
    padding: '0.5rem 1rem',
    flex: '0.8 1 0',
  },
  '&:before, &:after': {
    content: '""',
    width: '100%',
    height: '1px',
    backgroundColor: theme.color.gray300,
    flex: '1 1 0',
  },
}))

const ChatList = styled.ul(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  paddingBottom: '2rem',
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
