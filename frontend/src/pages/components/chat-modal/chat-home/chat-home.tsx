import styled from '@emotion/styled'
import {HTMLAttributes, Suspense} from 'react'

import {Flex} from '@/components/flex'
import {Icon} from '@/components/icon'
import {LazyImage} from '@/components/lazy-image'
import {Typography} from '@/components/typography'
import {useSuspendedApiCall} from '@/hooks/use-api-call'
import {ChatMessageHistory, ChatRoomInfo} from '@/hooks/use-chat-socket'
import {useChatModal} from '@/providers'
import {InstructorInfoResponse, StudentInfoResponse} from '@/types/user-info'
import {sessionProvider} from '@/utils/session'
import {timestampToString} from '@/utils/time'

export function ChatHome({onCloseClick}: {onCloseClick: () => void}) {
  if (!sessionProvider.session) throw new Error('no session')
  const role = sessionProvider.session.role
  return (
    <Container>
      <Flex justifyContent="space-between" alignItems="center" style={{padding: '2rem'}}>
        <Typography size="2rem" weight="bold" color="gray900">
          채팅 목록
        </Typography>
        <Icon
          name="close"
          color="gray900"
          width="1.5rem"
          height="1.5rem"
          style={{cursor: 'pointer'}}
          onClick={onCloseClick}
        />
      </Flex>
      <Suspense>
        {role === 'STUDENT' ? <StudentChatHomeContent /> : <InstructorChatHomeContent />}
      </Suspense>
    </Container>
  )
}

interface ExtendedChatRoomInfo {
  chatRoomInfo: ChatRoomInfo
  lastMessage: ChatMessageHistory | undefined
}

type ChatRoomsResponse = ExtendedChatRoomInfo[]

function StudentChatHomeContent() {
  const {handleOpen} = useChatModal()
  const {data} = useSuspendedApiCall<ChatRoomsResponse>(`/chat/student/rooms`)
  return (
    <ChatRoomList>
      {data?.map((v) => (
        <ChatRoomInstructorInfoCard
          onClick={() => handleOpen({content: 'ROOM', id: v.chatRoomInfo.instructorId})}
          key={v.chatRoomInfo.roomId}
          info={v}
        />
      ))}
    </ChatRoomList>
  )
}

interface ChatRoomInfoCardProps extends HTMLAttributes<HTMLDivElement> {
  info: ExtendedChatRoomInfo
}

function ChatRoomInstructorInfoCard({info, ...props}: ChatRoomInfoCardProps) {
  return (
    <CardContainer {...props}>
      <Suspense>
        <ChatRoomInstructorInfoCardContent info={info} />
      </Suspense>
    </CardContainer>
  )
}

function ChatRoomInstructorInfoCardContent({info}: ChatRoomInfoCardProps) {
  const {data} = useSuspendedApiCall<InstructorInfoResponse>(
    `/instructors/${info.chatRoomInfo.instructorId}`,
  )
  return (
    <>
      <Picture src={data?.instructorInfo.instructorImage} />
      <InfoContainer>
        <SingleLineDescriptions>
          <Typography color="gray700" size="1.7rem" weight={500}>
            {data?.instructorInfo.name}
          </Typography>
          <Typography color="gray600" size="1.5rem" weight={300}>
            {data?.academyInfo.name}
          </Typography>
        </SingleLineDescriptions>
        <LastMessageContainer>
          {info.lastMessage ? (
            <>
              <LastMessage>{info.lastMessage.message}</LastMessage>
              <TimeStamp>{timestampToString(info.lastMessage.timestamp)}</TimeStamp>
            </>
          ) : (
            <LastMessage>{data?.instructorInfo.name}님과 새로운 대화를 시작해보세요!</LastMessage>
          )}
        </LastMessageContainer>
      </InfoContainer>
    </>
  )
}

function InstructorChatHomeContent() {
  const {handleOpen} = useChatModal()
  const {data} = useSuspendedApiCall<ChatRoomsResponse>(`/chat/instructor/rooms`)
  return (
    <>
      {data?.map((v) => (
        <ChatRoomStudentInfoCard
          onClick={() => handleOpen({content: 'ROOM', id: v.chatRoomInfo.studentId})}
          key={v.chatRoomInfo.roomId}
          info={v}
        />
      ))}
    </>
  )
}

function ChatRoomStudentInfoCard({info, ...props}: ChatRoomInfoCardProps) {
  return (
    <CardContainer {...props}>
      <Suspense>
        <ChatRoomStudentInfoCardContent info={info} />
      </Suspense>
    </CardContainer>
  )
}

function ChatRoomStudentInfoCardContent({info}: ChatRoomInfoCardProps) {
  const {data} = useSuspendedApiCall<StudentInfoResponse>(
    `/students/${info.chatRoomInfo.studentId}`,
  )
  return (
    <>
      <Picture src={data?.studentImage} />
      <InfoContainer>
        <SingleLineDescriptions>
          <Typography color="gray700" size="1.7rem" weight={500}>
            {data?.name}
          </Typography>
          <Typography color="gray600" size="1.5rem" weight={300}>
            {data?.nickname}
          </Typography>
        </SingleLineDescriptions>
        <LastMessageContainer>
          {info.lastMessage ? (
            <>
              <LastMessage>{info.lastMessage.message}</LastMessage>
              <TimeStamp>{timestampToString(info.lastMessage.timestamp)}</TimeStamp>
            </>
          ) : (
            <LastMessage>{data?.name}님과 새로운 대화를 시작해보세요!</LastMessage>
          )}
        </LastMessageContainer>
      </InfoContainer>
    </>
  )
}

const SingleLineDescriptions = styled.div({
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'center',
})

const LastMessageContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
})

const LastMessage = styled.p(({theme}) => ({
  flexGrow: 1,
  color: theme.color.gray500,
  fontSize: '1.3rem',
  weight: 200,
  wordWrap: 'break-word',
  wordBreak: 'break-all',
  maxLines: 1,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}))

const TimeStamp = styled.p(({theme}) => ({
  color: theme.color.gray500,
  fontSize: '1.3rem',
  fontWeight: 200,
}))

const CardContainer = styled.div(({theme}) => ({
  border: `1px solid ${theme.color.gray200}`,
  padding: '0.5rem',
  borderRadius: '2rem',
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'center',
  minWidth: 'auto',
  cursor: 'pointer',
}))

const Picture = styled(LazyImage)(({theme}) => ({
  flex: '0 0 5rem',
  backgroundColor: theme.color.gray100,
  width: '5rem',
  height: '5rem',
  borderRadius: '50%',
  overflow: 'hidden',
  objectFit: 'cover',
}))

const InfoContainer = styled.div({
  alignItems: 'flex-start',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  minWidth: 0,
  gap: '0.1rem',
  width: '100%',
})

const ChatRoomList = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  overflowY: 'auto',
})

const Container = styled.div({
  width: '100%',
  height: '100%',
})
