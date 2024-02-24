import styled from '@emotion/styled'
import {useCallback, useEffect, useState} from 'react'
import {useLoaderData, useNavigate, useSearchParams} from 'react-router-dom'

import {Button} from '@/components/button'
import {Card} from '@/components/card'
import {Divider} from '@/components/divider'
import {Header} from '@/components/header'
import {Loading} from '@/components/loading'
import {useResetableInfiniteFetch} from '@/hooks/use-infinite-fetch'
import {useResettableIntersectionObserver} from '@/hooks/use-intersection-observer'
import {useChatModal} from '@/providers'
import {
  InstructorsResponseItem,
  useMapCoord,
  useMapPanTo,
  useSelectedId,
  useSetHoverId,
  useSetMapMarkers,
  useSetSelectedId,
} from '@/providers/map-context'
import {apiCall} from '@/utils/api'
import {objectToQS} from '@/utils/object-to-qs'

import {Coord} from '../schedule/hooks'
import {DetailDialog, SearchPreview} from './components'
import type {LoaderData} from './types'

const PAGE_SIZE = 5

export function SearchPage() {
  const {trainingTime, reservationTime, reservationDate, longitude, latitude} =
    useLoaderData() as LoaderData
  const [, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const selectedId = useSelectedId()
  const setSelectedId = useSetSelectedId()
  const setMarkers = useSetMapMarkers()
  const [searchCoord, setSearchCoord] = useState<Coord>({latitude: latitude, longitude: longitude})
  const mapCoord = useMapCoord()

  const queryFn = useCallback(
    async ({pageParam}: {pageParam: number}) => {
      const res = await apiCall(
        `/instructors?latitude=${searchCoord.latitude}&longitude=${searchCoord.longitude}&trainingTime=${trainingTime}&reservationTime=${reservationTime}&reservationDate=${reservationDate}&pageNumber=${pageParam}&pageSize=${PAGE_SIZE}`,
      )
      if (!res.ok) throw new Error('server error')
      const items = (await res.json()) as InstructorsResponseItem[]
      return items
    },
    [reservationDate, reservationTime, searchCoord.longitude, searchCoord.latitude, trainingTime],
  )

  const getNextPageParam = useCallback(
    ({pageParam, lastPage}: {pageParam: number; lastPage: InstructorsResponseItem[]}) => {
      const isLastPage = lastPage.length < PAGE_SIZE
      const nextPageParam = pageParam + 1
      return isLastPage ? undefined : nextPageParam
    },
    [],
  )

  // TODO: error handling
  const {data, loading, fetchNextPage} = useResetableInfiniteFetch({
    queryFn,
    initialPageParam: 1,
    getNextPageParam,
  })

  // todo: useEffect 없애기
  useEffect(() => {
    setMarkers(data)
  }, [data, setMarkers])

  const intersectedRef = useResettableIntersectionObserver(fetchNextPage)

  return (
    <>
      <SearchResultContainer>
        <Header px="2rem">
          <div style={{padding: '2rem 0'}}>
            <Header.BackButton onClick={() => navigate('/reservation/')} />
          </div>
        </Header>

        <Box>
          <H1>강사 선택</H1>
          <SearchPreview />
          <Divider />
        </Box>
        <InstructorList>
          {data?.map((instructor) => (
            <InstructorCardWrapper
              key={instructor.instructorId}
              instructor={instructor}
              trainingTime={trainingTime}
              reservationDate={reservationDate}
              reservationTime={reservationTime}
            />
          ))}
          <div ref={intersectedRef} style={{height: '3rem'}} />
          {loading && (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Loading />
            </div>
          )}
        </InstructorList>
        {selectedId && <DetailDialog id={selectedId} onClose={() => setSelectedId(null)} />}
      </SearchResultContainer>
      {searchCoord != mapCoord && (
        <Button
          style={{
            width: 'auto',
            height: 'auto',
            position: 'absolute',
            right: 20,
            bottom: 20,
            zIndex: 10,
          }}
          onClick={() => {
            setSearchParams((prev) => {
              prev.set('latitude', String(mapCoord.latitude))
              prev.set('longitude', String(mapCoord.longitude))
              return prev
            })
            setSearchCoord(mapCoord)
          }}
        >
          이 위치에서 재검색
        </Button>
      )}
    </>
  )
}

interface InstructorCardWrapperProps {
  instructor: InstructorsResponseItem
  trainingTime: number
  reservationDate: string
  reservationTime: number
}

function InstructorCardWrapper({
  instructor,
  trainingTime,
  reservationDate,
  reservationTime,
}: InstructorCardWrapperProps) {
  const navigate = useNavigate()
  const setHoverInstructorId = useSetHoverId()
  const mapPanTo = useMapPanTo()
  const selectedId = useSelectedId()
  const setSelectedId = useSetSelectedId()
  const chatModal = useChatModal()

  return (
    <Card.ReservationResult
      key={instructor.instructorId}
      instructorName={instructor.instructorName}
      academyName={instructor.academyName}
      image={instructor.instructorImage}
      pricePerHour={instructor.pricePerHour}
      distance={instructor.distance}
      duration={trainingTime}
      rating={instructor.averageRating}
      onRequestReservation={() => {
        const {instructorId, instructorName, academyName, pricePerHour} = instructor
        const searchParams = objectToQS({
          instructorId,
          reservationDate,
          reservationTime,
          trainingTime,
          instructorName,
          academyName,
          pricePerHour,
        })
        navigate(`/purchase?${searchParams}`)
      }}
      onMouseEnter={() => {
        setHoverInstructorId(instructor.instructorId)
      }}
      onMouseLeave={() => {
        setHoverInstructorId(null)
      }}
      onContact={() => {
        chatModal.handleOpen({content: 'ROOM', id: instructor.instructorId})
      }}
      selected={instructor.instructorId === selectedId}
      onClick={() => {
        const latlng = new kakao.maps.LatLng(instructor.latitude, instructor.longitude)
        mapPanTo(latlng)
        setSelectedId(instructor.instructorId)
      }}
    />
  )
}

const SearchResultContainer = styled.section(() => ({
  position: 'relative',
  width: '30%',
  minWidth: '45rem',
  height: '100%',
  boxShadow: '5px 1px 5px 0px rgb(0 0 0 / 10%)',
  // NOTE: box-shodow 스타일을 적용하기 위해 지도의 z index 보다 높힘
  zIndex: 2,
  display: 'flex',
  flexDirection: 'column',
}))

const H1 = styled.h1(({theme}) => ({
  color: theme.color.gray900,
  backgroundColor: theme.color.white,
  fontWeight: 'bold',
  fontSize: '2rem',
}))

const Box = styled.div(() => ({
  padding: '0 2rem 2rem',
}))

const InstructorList = styled.ul(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  flex: '1 1 0',
  overflowY: 'scroll',
  padding: '0 2rem 5rem',
}))
