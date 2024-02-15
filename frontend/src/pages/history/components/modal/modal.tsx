import styled from '@emotion/styled'
import {useRef, useState} from 'react'

import {Button} from '@/components/button'
import {Card} from '@/components/card'
import {Divider} from '@/components/divider'
import {Icon} from '@/components/icon'
import {Rating} from '@/components/rating'
import {useFetch} from '@/hooks/use-fetch'
import {API_BASE_URL} from '@/utils/constants'

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
    registerDate: string
    rating: number
  }
  academyInfo: {
    name: string
    latitude: number
    longitude: number
    cert: boolean
  }
}

const DEFAULT_RATING = 5

export function ReviewModal({onClose, reservationId, instructorId}: ReviewModalProps) {
  const {data} = useFetch<InstructorResponse>(`${API_BASE_URL}/instructors/${instructorId}`)

  const [submitting, setSubmitting] = useState<boolean>(false)
  const [rating, setRating] = useState<number>(DEFAULT_RATING)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const submitReview = () => {
    if (submitting) return
    setSubmitting(true)
    fetch(`${API_BASE_URL}/review`, {
      method: 'POST',
      body: JSON.stringify({
        rating,
        contents: textareaRef.current?.value,
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
      {data && (
        <Content>
          <InfoContainer>
            <Card.ProfilePic
              src={data.instructorInfo.instructorImage}
              style={{flexBasis: '6rem', width: '6rem', height: '6rem'}}
            />
            <Card.Name>{data.instructorInfo.name}</Card.Name>
          </InfoContainer>
          <Card.MultipleDescriptionContainer>
            <Card.Label color="gray600">{`평점 ${data.instructorInfo.rating}`}</Card.Label>
            <Card.Label color="gray600">{`시간당 ${data.instructorInfo.pricePerHour} 원`}</Card.Label>
          </Card.MultipleDescriptionContainer>
          <Card.IconLabel icon="building" color="gray600">
            {data.academyInfo.name}
          </Card.IconLabel>
          <Divider flexItem={true} />
          <Rating defaultValue={5} onValueChange={setRating} readOnly={submitting} />
          <TextArea ref={textareaRef} placeholder="내용을 작성해 주세요" rows={5} />
          <ActionsContainer>
            <Button style={{width: 'auto'}} onClick={submitReview}>
              등록
            </Button>
          </ActionsContainer>
        </Content>
      )}
    </Container>
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
  const {data} = useFetch<StudentResponse>(`${API_BASE_URL}/students/${studentId}`)

  return (
    <Container>
      <HeaderContainer>
        <Card.Name>학생 정보</Card.Name>
        <Icon name="close" color="black" width="1.4rem" height="1.4rem" onClick={onClose} />
      </HeaderContainer>
      {data && (
        <Content>
          <InfoContainer>
            <Card.ProfilePic
              src={data.studentImage}
              style={{flexBasis: '6rem', width: '6rem', height: '6rem'}}
            />
            <Card.Name>{data.name}</Card.Name>
          </InfoContainer>
          <Card.Label color="gray600">{data.nickname}</Card.Label>
          <Card.IconLabel icon="call" color="gray600">
            {data.phoneNumber}
          </Card.IconLabel>
        </Content>
      )}
    </Container>
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
