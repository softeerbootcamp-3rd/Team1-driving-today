import styled from '@emotion/styled'
import {useState} from 'react'

import {Card} from '@/components/card'
import {Tab} from '@/components/tab'
import {useFetch} from '@/hooks/use-fetch'
import {API_BASE_URL} from '@/utils/constants'

export interface StudentReservation {
  instructorId: number
  reservationId: number
  instructorImage: string
  instructorName: string
  academyName: string
  reservationDate: string
  reservationTime: number
  trainingTime: number
}

export type StudentHistoryResponse = StudentReservation[]

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  overflowY: 'hidden',
})
const List = styled.div({
  display: 'flex',
  overflowY: 'auto',
  flexDirection: 'column',
  padding: '2rem',
  gap: '1rem',
})
const Label = styled.p(({theme}) => ({
  fontWeight: 700,
  fontSize: '2rem',
  color: theme.color.gray800,
  padding: '2rem',
}))

interface StudentCardlistProps {
  onReviewClick: (item: StudentReservation) => void
  selected?: StudentReservation
}

function useStudentList() {
  // todo: infinite scroll
  return useFetch<StudentReservation[]>(`${API_BASE_URL}/my/reservations?pageNumber=1&pageSize=10`)
}

export function StudentCardlist({onReviewClick, selected}: StudentCardlistProps) {
  const {data} = useStudentList()
  const [filter, setFilter] = useState('all')
  return (
    <Container>
      <Tab.Provider defaultValue="all">
        <Label>예약 내역</Label>
        <Tab.ItemList onChange={setFilter}>
          <Tab.Item label="전체" value="all" />
          <Tab.Item label="예정" value="scheduled" />
          <Tab.Item label="완료" value="completed" />
        </Tab.ItemList>
        {data && (
          <List>
            {data.map((v) => {
              const canReview = isCompleted(v.reservationDate, v.reservationTime, v.trainingTime)
              const reviewClick = canReview ? () => onReviewClick(v) : undefined
              if ((filter === 'scheduled' && canReview) || (filter === 'completed' && !canReview))
                return
              return (
                <Card.StudentHistory
                  key={v.reservationId}
                  instructorName={v.instructorName}
                  academyName={v.academyName}
                  dateStr={v.reservationDate}
                  timeStr={timeToStr(v.reservationTime, v.trainingTime)}
                  image={v.instructorImage}
                  onReviewClick={reviewClick}
                  selected={selected?.reservationId === v.reservationId}
                />
              )
            })}
          </List>
        )}
      </Tab.Provider>
    </Container>
  )
}

export interface InstructorReservation {
  reservationId: number
  studentImage: string
  studentName: string
  phoneNumber: string
  reservationDate: string
  reservationTime: number
  trainingTime: number
  studentId: number
}

export type InstructorHistoryResponse = InstructorReservation[]

function useInstructorList() {
  // todo: infinite scroll
  return useFetch<InstructorReservation[]>(`${API_BASE_URL}/reservations?pageNumber=1&pageSize=10`)
}

interface InstructorCardlistProps {
  onSelect: (item: InstructorReservation) => void
  selected?: InstructorReservation
}

export function InstructorCardlist({onSelect, selected}: InstructorCardlistProps) {
  const {data} = useInstructorList()
  return (
    data && (
      <Container>
        <List>
          {data.map((v) => (
            <Card.InstructorHistory
              key={v.reservationId}
              studentName={v.studentName}
              phoneStr={v.phoneNumber}
              dateStr={v.reservationDate}
              timeStr={timeToStr(v.reservationTime, v.trainingTime)}
              image={v.studentImage}
              onClick={() => onSelect(v)}
              selected={selected?.reservationId === v.reservationId}
            />
          ))}
        </List>
      </Container>
    )
  )
}

function timeToStr(reservationTime: number, trainingTime: number) {
  return `${reservationTime}시~${reservationTime + trainingTime}시 (${trainingTime}시간)`
}

function isCompleted(reservationDate: string, reservationTime: number, trainingTime: number) {
  const now = new Date()
  const date = new Date(`${reservationDate} ${reservationTime + trainingTime}:00:00`)
  return now > date
}
