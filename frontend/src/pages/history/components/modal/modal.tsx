import styled from '@emotion/styled'
import {Suspense, useRef, useState} from 'react'

import {Button} from '@/components/button'
import {Card} from '@/components/card'
import {Divider} from '@/components/divider'
import {Icon} from '@/components/icon'
import {Loading} from '@/components/loading'
import {Rating} from '@/components/rating'
import {useSuspendedApiCall} from '@/hooks/use-api-call'
import {apiCall} from '@/utils/api'

interface ReviewModalProps {
  onClose: () => void
  reservationId: number
  instructorId: number
}

interface InstructorResponse {
  instructorInfo: {
    id: number
    name: string
    phoneNumber: string
    instructorImage: string
    pricePerHour: number
    introduction: string
  }
  academyInfo: {
    name: string
    latitude: number
    longitude: number
    cert: boolean
  }
  averageRating: number
}

const DEFAULT_RATING = 5

export function ReviewModal({onClose, ...props}: ReviewModalProps) {
  const [submitting, setSubmitting] = useState<boolean>(false)

  const submitReview = (reservationId: number, rating: number, content?: string) => {
    // todo: validation
    if (submitting) return
    setSubmitting(true)
    apiCall('/review', {
      method: 'POST',
      body: JSON.stringify({
        rating,
        contents: content,
        reservationId,
      }),
      headers: {'Content-Type': 'application/json'},
    }).then((res) => {
      if (res.status === 201) onClose()
      else setSubmitting(false)
      // todo: error handling
    })
  }

  return (
    <Container blockInput={submitting}>
      <HeaderContainer>
        <Card.Name>리뷰 작성</Card.Name>
        <Icon name="close" color="black" width="1.4rem" height="1.4rem" onClick={onClose} />
      </HeaderContainer>
      <Content>
        <Suspense fallback={<Loading />}>
          <ReviewModalContent {...props} onSubmitReview={submitReview} submitting={submitting} />
        </Suspense>
      </Content>
    </Container>
  )
}

interface ReviewModalContentProps {
  reservationId: number
  instructorId: number
  onSubmitReview: (reservationId: number, rating: number, content?: string) => void
  submitting: boolean
}

function ReviewModalContent({
  reservationId,
  instructorId,
  onSubmitReview,
  submitting,
}: ReviewModalContentProps) {
  const {data} = useSuspendedApiCall<InstructorResponse>(`/instructors/${instructorId}`)
  const [rating, setRating] = useState<number>(DEFAULT_RATING)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  return (
    <>
      <InfoContainer>
        <Card.ProfilePic
          src={data?.instructorInfo.instructorImage}
          style={{flexBasis: '6rem', width: '6rem', height: '6rem'}}
        />
        <Card.Name>{data?.instructorInfo.name}</Card.Name>
      </InfoContainer>
      <Card.MultipleDescriptionContainer>
        <Card.Label color="gray600">{`평점 ${data?.averageRating.toPrecision(2)}`}</Card.Label>
        <Card.Label color="gray600">{`시간당 ${data?.instructorInfo.pricePerHour} 원`}</Card.Label>
      </Card.MultipleDescriptionContainer>
      <Card.IconLabel icon="building" color="gray600">
        {data?.academyInfo.name}
      </Card.IconLabel>
      <Divider flexItem={true} />
      <Rating defaultValue={5} onValueChange={setRating} readOnly={submitting} />
      <TextArea ref={textareaRef} placeholder="내용을 작성해 주세요" rows={5} />
      <ActionsContainer>
        <Button
          style={{width: 'auto'}}
          onClick={() => onSubmitReview(reservationId, rating, textareaRef.current?.value)}
        >
          등록
        </Button>
      </ActionsContainer>
    </>
  )
}

interface StudentModalProps {
  onClose: () => void
  studentId: number
}

interface StudentResponse {
  name: string
  phoneNumber: string
  studentImage: string
  nickname: string
}

export function StudentModal({onClose, studentId}: StudentModalProps) {
  return (
    <Container>
      <HeaderContainer>
        <Card.Name>학생 정보</Card.Name>
        <Icon name="close" color="black" width="1.4rem" height="1.4rem" onClick={onClose} />
      </HeaderContainer>
      <Suspense fallback={<Loading />}>
        <StudentModalContent studentId={studentId} />
      </Suspense>
    </Container>
  )
}

interface StudentModalContentProps {
  studentId: number
}

function StudentModalContent({studentId}: StudentModalContentProps) {
  const {data} = useSuspendedApiCall<StudentResponse>(`/students/${studentId}`)
  return (
    <Content>
      <InfoContainer>
        <Card.ProfilePic
          src={data?.studentImage}
          style={{flexBasis: '6rem', width: '6rem', height: '6rem'}}
        />
        <Card.Name>{data?.name}</Card.Name>
      </InfoContainer>
      <Card.Label color="gray600">{data?.nickname}</Card.Label>
      <Card.IconLabel icon="call" color="gray600">
        {data?.phoneNumber}
      </Card.IconLabel>
    </Content>
  )
}

interface ContainerProps {
  blockInput?: boolean
}

const Container = styled.div<ContainerProps>(({theme, blockInput}) => ({
  pointerEvents: blockInput ? 'none' : 'auto',
  width: '100%',
  display: 'flex',
  padding: '1rem',
  gap: '1rem',
  borderRadius: '1.6rem',
  flexDirection: 'column',
  border: `1px solid ${theme.color.gray200}`,
  filter: `drop-shadow(0 0.5rem 0.4rem ${theme.color.gray300})`,
  backgroundColor: theme.color.white,
}))

const HeaderContainer = styled.div({
  display: 'flex',
  padding: '1rem',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const Content = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '2rem',
  padding: '0.5rem 2rem',
})

const InfoContainer = styled.div({
  alignItems: 'center',
  display: 'flex',
  padding: '2rem',
  gap: '1rem',
})

const TextArea = styled.textarea(({theme}) => ({
  borderRadius: '1.6rem',
  backgroundColor: theme.color.gray200,
  padding: '1rem',
  width: '100%',
  fontSize: '1.4rem',
}))

const ActionsContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  width: '100%',
})
