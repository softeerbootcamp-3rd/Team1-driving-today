import styled from '@emotion/styled'
import {Suspense} from 'react'
import {useNavigate} from 'react-router-dom'

import {Divider} from '@/components/divider'
import {Icon} from '@/components/icon'
import {Skeleton} from '@/components/skeleton'
import {useSuspendedApiCall} from '@/hooks/use-api-call'
import {UserRole} from '@/utils/session'

interface MyProfileCardProps {
  role: UserRole
}

export function MyProfileCard({role}: MyProfileCardProps) {
  return (
    <Container>
      <Suspense fallback={<MyProfileCardSkeleton />}>
        {role === 'INSTRUCTOR' && <InstructorMyProfileCardContent />}
        {role === 'STUDENT' && <StudentMyProfileCardContent />}
      </Suspense>
    </Container>
  )
}

interface InstructorMyInfoResponse {
  id: number
  instructorImage: string
  introduction: string
  name: string
  phoneNumber: string
  pricePerHour: number
}

function InstructorMyProfileCardContent() {
  // todo: connect api on implementation
  const {data} = useSuspendedApiCall<InstructorMyInfoResponse>('/instructor/my')
  const navigate = useNavigate()
  return (
    <>
      <Image src={data?.instructorImage} />
      <NameContainer>
        <Name>{`안녕하세요 ${data?.name}님!`}</Name>
        <Nickname>{data?.introduction}</Nickname>
      </NameContainer>
      <Divider flexItem />
      <TrailingIconLink onClick={() => navigate('/history')}>
        <ButtonLabel>지난 예약 내역</ButtonLabel>
        <Icon name="arrowForward" color="gray600" width="1.6rem" height="1.6rem" />
      </TrailingIconLink>
    </>
  )
}

interface StudentMyInfoResponse {
  name: string
  phoneNumber: string
  studentImage: string
  nickname: string
}

function StudentMyProfileCardContent() {
  // todo: connect api on implementation
  const {data} = useSuspendedApiCall<StudentMyInfoResponse>('/student/my')
  const navigate = useNavigate()
  return (
    <>
      <Image src={data?.studentImage} />
      <NameContainer>
        <Name>{`안녕하세요 ${data?.name}님!`}</Name>
        <Nickname>{`@${data?.nickname}`}</Nickname>
      </NameContainer>
      <Divider flexItem />
      <TrailingIconLink onClick={() => navigate('/history')}>
        <ButtonLabel>지난 예약 내역</ButtonLabel>
        <Icon name="arrowForward" color="gray600" width="1.6rem" height="1.6rem" />
      </TrailingIconLink>
    </>
  )
}

function MyProfileCardSkeleton() {
  return (
    <>
      <Skeleton variant="circular" width="10rem" height="10rem" />
      <div style={{alignSelf: 'flex-start'}}>
        <Skeleton style={{fontSize: '2.4rem'}} width="20rem" />
        <Skeleton style={{fontSize: '1.4rem'}} width="10rem" />
      </div>
      <Divider flexItem />
      <Skeleton style={{fontSize: '1.6rem', alignSelf: 'flex-start'}} width="10rem" />
    </>
  )
}

const Container = styled.div(({theme}) => ({
  borderRadius: '1.6rem',
  width: '100%',
  border: `1px solid ${theme.color.gray200}`,
  display: 'flex',
  flexDirection: 'column',
  padding: '3rem',
  gap: '2rem',
  alignItems: 'center',
}))

const Image = styled.img(({theme}) => ({
  backgroundColor: theme.color.gray300,
  width: '10rem',
  height: '10rem',
  borderRadius: '50%',
  overflow: 'hidden',
  objectFit: 'contain',
}))

const NameContainer = styled.div({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: '0.4rem 0',
  gap: '0.4rem',
})

const TrailingIconLink = styled.a({
  cursor: 'pointer',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1.6rem 0',
})

const Name = styled.p(({theme}) => ({
  color: theme.color.gray600,
  fontSize: '2.4rem',
  fontWeight: 700,
}))

const Nickname = styled.p(({theme}) => ({
  color: theme.color.gray400,
  fontSize: '1.4rem',
  fontWeight: 500,
}))

const ButtonLabel = styled.p(({theme}) => ({
  color: theme.color.gray900,
  fontWeight: 700,
  fontSize: '1.6rem',
}))
