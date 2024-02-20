import styled from '@emotion/styled'
import {Suspense, useState} from 'react'

import {Card} from '@/components/card'
import {Loading} from '@/components/loading'
import {Tab} from '@/components/tab'
import {useSuspendedApiCall} from '@/hooks/use-api-call'
import {useInfiniteFetch} from '@/hooks/use-infinite-fetch'
import {useIntersectionObserver} from '@/hooks/use-intersection-observer'
import {InstructorReservation, StudentReservation} from '@/types/reservation'
import {apiCall} from '@/utils/api'

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
  onReviewClick: (item: InstructorReservation) => void
  selected?: InstructorReservation
}

export function StudentCardlist(props: StudentCardlistProps) {
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
        <List>
          <Suspense fallback={<Loading />}>
            <StudentCardListContent {...props} filter={filter} />
          </Suspense>
        </List>
      </Tab.Provider>
    </Container>
  )
}

interface StudentCardListContentProps extends StudentCardlistProps {
  filter: string
}

function StudentCardListContent({onReviewClick, selected, filter}: StudentCardListContentProps) {
  // todo: probably have to sort this
  const {data: pastList} = useSuspendedApiCall<InstructorReservation[]>(
    '/student/reservations?isUpcoming=false',
  )
  const {data: futureList} = useSuspendedApiCall<InstructorReservation[]>(
    '/student/reservations?isUpcoming=true',
  )
  return (
    <>
      {(filter === 'scheduled' || filter === 'all') &&
        futureList?.map((v) => (
          <Card.StudentHistory
            key={v.reservationId}
            instructorName={v.instructorName}
            academyName={v.academyName}
            dateStr={v.reservationDate}
            timeStr={timeToStr(v.reservationTime, v.trainingTime)}
            image={v.instructorImage}
            selected={selected?.reservationId === v.reservationId}
          />
        ))}
      {(filter === 'completed' || filter === 'all') &&
        pastList?.map((v) => (
          <Card.StudentHistory
            key={v.reservationId}
            instructorName={v.instructorName}
            academyName={v.academyName}
            dateStr={v.reservationDate}
            timeStr={timeToStr(v.reservationTime, v.trainingTime)}
            image={v.instructorImage}
            onReviewClick={() => onReviewClick(v)}
            selected={selected?.reservationId === v.reservationId}
          />
        ))}
    </>
  )
}

interface InstructorCardlistProps {
  onSelect: (item: StudentReservation) => void
  selected?: StudentReservation
}

const PAGE_SIZE = 5

export function InstructorCardlist({onSelect, selected}: InstructorCardlistProps) {
  const {data, loading, fetchNextPage} = useInfiniteFetch({
    queryFn: ({pageParam}) => {
      return apiCall(
        `/instructor/reservations?pageNumber=${pageParam}&pageSize=${PAGE_SIZE}&isUpcoming=false`,
      ).then((res) => res.json())
    },
    initialPageParam: 1,
    getNextPageParam: ({pageParam, lastPage}) => {
      const isLastPage = lastPage.length < PAGE_SIZE
      const nextPageParam = pageParam + 1
      return isLastPage ? undefined : nextPageParam
    },
  })

  // TODO: fix type bug #191
  // returned data type from infiniteFetch is 2 dimensional array, when it actually is single dimension array
  // remove line below on issue solved
  const reservations = data as StudentReservation[]

  const intersectedRef = useIntersectionObserver(() => fetchNextPage())
  return (
    <Container>
      <List>
        {reservations?.map((v) =>
          v.isUpcoming ? (
            <RejectableInstructorCard
              key={v.reservationId}
              v={v}
              onSelect={onSelect}
              selected={selected}
            />
          ) : (
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
          ),
        )}
        <div ref={intersectedRef} style={{height: '3rem'}} />
        {loading && <Loading />}
      </List>
    </Container>
  )
}

interface RejectableInstructorCardProps extends InstructorCardlistProps {
  v: StudentReservation
}

function RejectableInstructorCard({v, onSelect, selected}: RejectableInstructorCardProps) {
  // const [deleting, setDeleting] = useState(false)
  // todo: implement rejection
  return (
    <Card.InstructorHistory
      key={v.reservationId}
      studentName={v.studentName}
      phoneStr={v.phoneNumber}
      dateStr={v.reservationDate}
      timeStr={timeToStr(v.reservationTime, v.trainingTime)}
      image={v.studentImage}
      onClick={() => onSelect(v)}
      onRejectClick={() => {}}
      selected={selected?.reservationId === v.reservationId}
    />
  )
}

function timeToStr(reservationTime: number, trainingTime: number) {
  return `${reservationTime}시~${reservationTime + trainingTime}시 (${trainingTime}시간)`
}
