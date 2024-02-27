import styled from '@emotion/styled'
import {forwardRef, Suspense, useImperativeHandle, useState} from 'react'

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

export const StudentCardlist = forwardRef<StudentCardListControl, StudentCardlistProps>(
  function StudentCardlist(props, ref) {
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
            <Suspense fallback={<CardListSkeleton />}>
              <StudentCardListContent ref={ref} {...props} filter={filter} />
            </Suspense>
          </List>
        </Tab.Provider>
      </Container>
    )
  },
)

export interface StudentCardListControl {
  addReviewed: (id: number) => void
}

function CardListSkeleton() {
  return (
    <>
      {Array.from(Array(3)).map((_, index) => {
        return <Card.Skeleton key={index} />
      })}
    </>
  )
}

interface StudentCardListContentProps extends StudentCardlistProps {
  filter: string
}

const StudentCardListContent = forwardRef<StudentCardListControl, StudentCardListContentProps>(
  function StudentCardListContent({onReviewClick, selected, filter}, ref) {
    // todo: probably have to sort this
    const {data: pastList} = useSuspendedApiCall<InstructorReservation[]>(
      '/reservations/student?status=past',
    )
    const {data: futureList} = useSuspendedApiCall<InstructorReservation[]>(
      '/reservations/student?status=scheduled',
    )
    const [removed, setRemoved] = useState<Set<number>>(new Set())
    const [reviewed, setReviewed] = useState<Set<number>>(new Set())

    useImperativeHandle(ref, () => ({
      addReviewed: (id: number) => setReviewed((prev) => new Set(prev).add(id)),
    }))

    const onCancelReservation = async (id: number) => {
      // 중복 요청 들어가도 상관 없음
      const res = await apiCall(`/reservations/${id}?role=student`, {method: 'DELETE'})
      if (!res.ok) return
      setRemoved((prev) => new Set(prev).add(id))
    }

    return (
      <>
        {(filter === 'scheduled' || filter === 'all') &&
          futureList?.map(
            (v) =>
              !removed.has(v.reservationId) && (
                // todo: add cancel button after #188
                <Card.StudentHistory
                  key={v.reservationId}
                  instructorName={v.instructorName}
                  academyName={v.academyName}
                  dateStr={v.reservationDate}
                  timeStr={timeToStr(v.reservationTime, v.trainingTime)}
                  image={v.instructorImage}
                  selected={selected?.reservationId === v.reservationId}
                  onCancelClick={() => onCancelReservation(v.reservationId)}
                />
              ),
          )}
        {(filter === 'completed' || filter === 'all') &&
          pastList?.map(
            (v) =>
              !removed.has(v.reservationId) && (
                <Card.StudentHistory
                  key={v.reservationId}
                  instructorName={v.instructorName}
                  academyName={v.academyName}
                  dateStr={v.reservationDate}
                  timeStr={timeToStr(v.reservationTime, v.trainingTime)}
                  image={v.instructorImage}
                  onReviewClick={
                    v.isReviewed || reviewed.has(v.reservationId)
                      ? undefined
                      : () => onReviewClick(v)
                  }
                  selected={selected?.reservationId === v.reservationId}
                />
              ),
          )}
      </>
    )
  },
)

interface InstructorCardlistProps {
  onSelect: (item: StudentReservation) => void
  selected?: StudentReservation
}

const PAGE_SIZE = 5

export function InstructorCardlist({onSelect, selected}: InstructorCardlistProps) {
  const {
    data: reservations,
    loading,
    fetchNextPage,
  } = useInfiniteFetch({
    queryFn: async ({pageParam}) => {
      const res = await apiCall(
        `/reservations/instructor?pageNumber=${pageParam}&pageSize=${PAGE_SIZE}&status=past`,
      )
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
      return (await res.json()) as StudentReservation[]
    },
    initialPageParam: 1,
    getNextPageParam: ({pageParam, lastPage}) => {
      const isLastPage = lastPage.length < PAGE_SIZE
      const nextPageParam = pageParam + 1
      return isLastPage ? undefined : nextPageParam
    },
  })

  const intersectedRef = useIntersectionObserver(() => fetchNextPage())
  return (
    <Container>
      <List>
        {reservations?.map((v) => (
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
        <div ref={intersectedRef} style={{height: '3rem'}} />
        {loading && <Loading />}
      </List>
    </Container>
  )
}

function timeToStr(reservationTime: number, trainingTime: number) {
  return `${reservationTime}시~${reservationTime + trainingTime}시 (${trainingTime}시간)`
}
