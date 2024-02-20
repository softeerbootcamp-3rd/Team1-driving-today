import styled from '@emotion/styled'
import {Suspense, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'

import {Button} from '@/components/button'
import {Card} from '@/components/card'
import {Divider} from '@/components/divider'
import {Icon} from '@/components/icon'
import {Loading} from '@/components/loading'
import {useSuspendedApiCall} from '@/hooks/use-api-call'
import {useInfiniteFetch} from '@/hooks/use-infinite-fetch'
import {useIntersectionObserver} from '@/hooks/use-intersection-observer'
import {useScrollTo} from '@/hooks/use-scroll-to'
import {apiCall} from '@/utils/api'

import {Calendar, CalendarRef, ReservationSchedule} from '../calendar'

const PAGE_SIZE = 5

export function StudentScheduleCard() {
  return (
    <Container>
      <Suspense fallback={<Loading />}>
        <StudentScheduleCardContent />
      </Suspense>
    </Container>
  )
}

function StudentScheduleCardContent() {
  const {data: reservations} = useSuspendedApiCall<InstructorReservation[]>(
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

  const schedules = buildScheduleFromReservation(reservations)

  const {setItemRef, listRef, scrollTo} = useScrollTo()

  const navigate = useNavigate()

  const date = new Date()

  return (
    <>
      {reservations?.length ? (
        <>
          <BoldLabel>운전 연수가 예정되어 있어요</BoldLabel>
          <CardList ref={listRef}>
            {reservations?.map((data) => (
              // <div key={data.reservationId} >
              //   {data.reservationId}
              // </div>
              <Card.StudentHistory
                ref={(element) => setItemRef(data.reservationId, element)}
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
          <Button onClick={() => navigate('/search')}>운전 연수 예약하기</Button>
        </>
      )}
      <Divider />
      <Calendar
        ref={calendarRef}
        year={date.getFullYear()}
        month={date.getMonth() + 1}
        day={date.getDate()}
        schedules={schedules}
        onScheduleClick={(s) => {
          scrollTo(s.reservationId)
          setSelectedId(s.reservationId)
        }}
      />
    </>
  )
}

export function InstructorScheduleCard() {
  const [selectedId, setSelectedId] = useState<number>()
  const calendarRef = useRef<CalendarRef>(null)
  // TODO: error handling

  const {data, loading, fetchNextPage} = useInfiniteFetch({
    queryFn: ({pageParam}) => {
      return apiCall(
        `/instructor/reservations?isUpcoming=true&pageNumber=${pageParam}&pageSize=${PAGE_SIZE}`,
      ).then((res) => res.json())
    },
    initialPageParam: 1,
    getNextPageParam: ({pageParam, lastPage}) => {
      const isLastPage = (lastPage as StudentReservation[]).length < PAGE_SIZE
      const nextPageParam = pageParam + 1
      return isLastPage ? undefined : nextPageParam
    },
  })
  // TODO: fix type bug #191
  // returned data type from infiniteFetch is 2 dimensional array, when it actually is single dimension array
  // remove line below on issue solved
  const reservations = data as StudentReservation[]

  const intersectedRef = useIntersectionObserver(() => fetchNextPage())
  const {setItemRef, listRef, scrollTo} = useScrollTo()

  const rejectReservationRequest = async (id: number) => {
    // todo: API
    // const res = await fetch(`${API_BASE_URL}/reservations/${id}`, {method: 'DELETE'})
  }

  const schedules = buildScheduleFromReservation(reservations)

  const date = new Date()

  return (
    <Container>
      <BoldLabel>운전 연수 예약 요청</BoldLabel>
      <CardList ref={listRef}>
        {reservations?.map((v) => (
          <Card.InstructorHistory
            ref={(element) => setItemRef(v.reservationId, element)}
            key={v.reservationId}
            selected={v.reservationId === selectedId}
            onClick={() => {
              setSelectedId(v.reservationId)
              calendarRef.current?.dispatch({
                type: 'SET_DATE_STR',
                payload: v.reservationDate,
              })
            }}
            studentName={v.studentName}
            phoneStr={v.phoneNumber}
            dateStr={v.reservationDate}
            timeStr={timeToStr(v.reservationTime, v.trainingTime)}
            image={v.studentImage}
            onRejectClick={() => rejectReservationRequest(v.reservationId)}
          />
        ))}
        <div ref={intersectedRef} style={{height: '3rem'}} />
        {loading && <Loading />}
      </CardList>
      <Divider />
      <Calendar
        ref={calendarRef}
        year={date.getFullYear()}
        month={date.getMonth() + 1}
        day={date.getDate()}
        schedules={schedules}
        onScheduleClick={(s) => {
          scrollTo(s.reservationId)
          setSelectedId(s.reservationId)
        }}
      />
    </Container>
  )
}

function buildScheduleFromReservation(
  reservations?: {
    reservationDate: string
    reservationId: number
    reservationTime: number
    trainingTime: number
  }[],
) {
  const schedules: Record<string, ReservationSchedule[]> = {}
  reservations?.forEach((schedule) => {
    if (!schedules[schedule.reservationDate]) schedules[schedule.reservationDate] = []
    schedules[schedule.reservationDate].push({
      reservationId: schedule.reservationId,
      time: schedule.reservationTime,
      duration: schedule.trainingTime,
    })
  })
  return schedules
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

interface InstructorReservation {
  reservationId: number
  instructorImage: string
  instructorName: string
  academyName: string
  reservationDate: string
  reservationTime: number
  trainingTime: number
  instructorId: number
}

interface StudentReservation {
  reservationId: number
  studentImage: string
  studentName: string
  phoneNumber: string
  reservationDate: string
  reservationTime: number
  trainingTime: number
  studentId: number
  isUpcoming: boolean
}
