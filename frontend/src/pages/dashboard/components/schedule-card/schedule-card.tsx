import styled from '@emotion/styled'
import {Suspense, useRef, useState} from 'react'

import {Button} from '@/components/button'
import {Card} from '@/components/card'
import {Divider} from '@/components/divider'
import {Icon} from '@/components/icon'
import {Loading} from '@/components/loading'
import {useSuspendedApiCall} from '@/hooks/use-api-call'
import {StudentReservation} from '@/pages/history/components/cardlist'

import {Calendar, CalendarRef, ReservationSchedule} from '../calendar'

export function ScheduleCard() {
  // todo: do actual API call

  return (
    <Container>
      <Suspense fallback={<Loading />}>
        <StudentCardContent />
      </Suspense>
    </Container>
  )
}

function StudentCardContent() {
  const {data: scheduleList} = useSuspendedApiCall<StudentReservation[]>(
    '/student/reservations?isUpcoming=true',
  )
  const calendarRef = useRef<CalendarRef>(null)

  const [selectedId, setSelectedId] = useState<number>()

  const onCancelClick = async () => {
    // todo: delete api call
    // const res = await apiCall(`/reservations/${data.reservationId}`, {
    //   method: 'DELETE',
    // })
  }

  const schedules: Record<string, ReservationSchedule[]> = {}
  scheduleList?.forEach((schedule) => {
    if (!schedules[schedule.reservationDate]) schedules[schedule.reservationDate] = []
    schedules[schedule.reservationDate].push({
      reservationId: schedule.reservationId,
      time: schedule.reservationTime,
      duration: schedule.trainingTime,
    })
  })

  const date = new Date()

  return (
    <>
      {scheduleList?.length ? (
        <>
          <BoldLabel>운전 연수가 예정되어 있어요</BoldLabel>
          <CardList>
            {scheduleList?.map((data) => (
              <Card.StudentHistory
                selected={selectedId === data.reservationId}
                onClick={() => {
                  setSelectedId(data.reservationId)
                  calendarRef.current?.dispatch({
                    type: 'SET_DATE_STR',
                    payload: data.reservationDate,
                  })
                }}
                key={data.reservationId}
                style={{width: '100%'}}
                instructorName={data.instructorName}
                academyName={data.academyName}
                dateStr={data.reservationDate}
                timeStr={timeToStr(data.reservationTime, data.trainingTime)}
                image={data.instructorImage}
                onCancelClick={onCancelClick}
              />
            ))}
          </CardList>
        </>
      ) : (
        <>
          <Icon name="car" color="black" width="2.8rem" height="2.8rem" />
          <BoldLabel>예정된 연수가 없어요</BoldLabel>
          <Label>지금 바로 운전 연수를 예약해보세요</Label>
          <Button>운전 연수 예약하기</Button>
        </>
      )}
      <Divider />
      <Calendar
        ref={calendarRef}
        year={date.getFullYear()}
        month={date.getMonth() + 1}
        day={date.getDate()}
        schedules={schedules}
        onScheduleClick={(s) => setSelectedId(s.reservationId)}
      />
    </>
  )
}

const CardList = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: '1rem',
  gap: '1rem',
  flex: '0 0 22rem',
  maxHeight: '22rem',
  overflowY: 'auto',
})

const Container = styled.div(({theme}) => ({
  width: '100%',
  borderRadius: '1.6rem',
  border: `1px solid ${theme.color.gray200}`,
  padding: '3rem 2rem',
  gap: '1rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  overflowY: 'auto',
  justifyItems: 'center',
}))

const BoldLabel = styled.p(({theme}) => ({
  color: theme.color.gray900,
  fontWeight: 700,
  fontSize: '1.6rem',
  width: '100%',
}))

const Label = styled.p(({theme}) => ({
  color: theme.color.gray900,
  fontWeight: 500,
  fontSize: '1.6rem',
}))

function timeToStr(reservationTime: number, trainingTime: number) {
  return `${reservationTime}시~${reservationTime + trainingTime}시 (${trainingTime}시간)`
}
