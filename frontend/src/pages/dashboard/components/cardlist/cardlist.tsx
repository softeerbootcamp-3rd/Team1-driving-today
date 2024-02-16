import styled from '@emotion/styled'

import {Card} from '@/components/card'
import {useApiCall, UseApiResult} from '@/hooks/use-api-call'

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  overflowY: 'hidden',
})

const List = styled.div({
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  padding: '2rem',
  gap: '1rem',
})

interface StudentReservation {
  reservationId: number
  studentImage: string
  studentName: string
  phoneNumber: string
  reservationDate: string
  reservationTime: number
  trainingTime: number
  studentId: number
}

function useStudentReservationList(): UseApiResult<StudentReservation[]> {
  // todo: infinite scroll
  return useApiCall<StudentReservation[]>('/reservations?pageNumber=1&pageSize=10')
}

export function Cardlist() {
  // TODO: use real API
  const {data: studentReservationList, reload} = useStudentReservationList()

  const rejectReservationRequest = async (id: number) => {
    // todo: API
    // const res = await fetch(`${API_BASE_URL}/reservations/${id}`, {method: 'DELETE'})
    reload()
  }

  return (
    studentReservationList && (
      <Container>
        <List>
          {studentReservationList.map((v) => (
            <Card.InstructorHistory
              key={v.reservationId}
              studentName={v.studentName}
              phoneStr={v.phoneNumber}
              dateStr={v.reservationDate}
              timeStr={timeToStr(v.reservationTime, v.trainingTime)}
              image={v.studentImage}
              onRejectClick={() => rejectReservationRequest(v.reservationId)}
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
