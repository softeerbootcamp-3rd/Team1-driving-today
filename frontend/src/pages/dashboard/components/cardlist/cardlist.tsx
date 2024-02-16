import styled from '@emotion/styled'

import {Card} from '@/components/card'

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

export function Cardlist() {
  // TODO: use real API
  // const {data, reload} = useInstructorList()
  const data = [
    {
      reservationId: 0,
      studentImage: 'string',
      studentName: 'string',
      phoneNumber: 'string',
      reservationDate: '2024-02-15',
      reservationTime: 12,
      trainingTime: 2,
      studentId: 1,
    },
    {
      reservationId: 1,
      studentImage: 'string',
      studentName: 'string',
      phoneNumber: 'string',
      reservationDate: '2024-02-15',
      reservationTime: 13,
      trainingTime: 1,
      studentId: 1,
    },
    {
      reservationId: 2,
      studentImage: 'string',
      studentName: 'string',
      phoneNumber: 'string',
      reservationDate: '2024-02-15',
      reservationTime: 13,
      trainingTime: 1,
      studentId: 1,
    },
  ]

  const reload = () => {}

  const rejectReservationRequest = async (id: number) => {
    // todo: API
    // const res = await fetch(`${API_BASE_URL}/reservations/${id}`, {method: 'DELETE'})
    reload()
  }

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

// function useInstructorList() {
//   // todo: infinite scroll
//   return useFetch<InstructorReservation[]>(`${API_BASE_URL}/reservations?pageNumber=1&pageSize=10`)
// }
