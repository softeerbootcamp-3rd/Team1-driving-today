import styled from '@emotion/styled'
import {useRef, useState} from 'react'
import {Map, MapMarker, MarkerClusterer} from 'react-kakao-maps-sdk'
import {useLoaderData, useNavigate, useSearchParams} from 'react-router-dom'

import {Card} from '@/components/card'
import {Divider} from '@/components/divider'
import {Header} from '@/components/header'
import {objectToQS} from '@/utils/object-to-qs'

import {DetailDialog, SearchPreview} from './components'
import {dummydata} from './data'

interface LoaderData {
  reservationDate: string
  reservationTime: number
  trainingTime: number
  longitude: number
  latitude: number
}

export function SearchPage() {
  const {trainingTime, reservationTime, reservationDate, longitude, latitude} =
    useLoaderData() as LoaderData
  const [, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const mapRef = useRef<kakao.maps.Map | null>(null)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  return (
    <>
      <SearchResultContainer>
        <Header px="2rem">
          <div style={{padding: '2rem 0'}}>
            <Header.BackButton onClick={() => navigate('/schedule')} />
          </div>
        </Header>

        <Box>
          <H1>강사 선택</H1>
          <SearchPreview />
          <Divider />
        </Box>
        <InstructorList>
          {dummydata.map((instructor) => (
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
              selected={instructor.instructorId === selectedId}
              onClick={() => {
                const latlng = new kakao.maps.LatLng(instructor.latitude, instructor.longitude)
                mapRef.current?.panTo(latlng)
                setSelectedId(instructor.instructorId)
              }}
            />
          ))}
        </InstructorList>
        {selectedId && <DetailDialog id={selectedId} onClose={() => setSelectedId(null)} />}
      </SearchResultContainer>

      <Map
        id="map"
        center={{
          lat: latitude,
          lng: longitude,
        }}
        style={{
          width: '100%',
          height: '100%',
        }}
        isPanto
        ref={mapRef}
        level={3}
        onDragEnd={(map) => {
          const latlng = map.getCenter()
          // TODO: 지도 드래그를 통한 주소 검색
          setSearchParams((prev) => {
            prev.set('latitude', String(latlng.getLat()))
            prev.set('longitude', String(latlng.getLng()))
            return prev
          })
        }}
      >
        <MarkerClusterer averageCenter={true} minLevel={10}>
          {dummydata.map((instructor) => (
            <MapMarker
              key={instructor.instructorId}
              position={{
                lat: instructor.latitude,
                lng: instructor.longitude,
              }}
              image={{
                src: '/marker.png',
                size: {
                  width: 38,
                  height: 48,
                },
              }}
            />
          ))}
        </MarkerClusterer>
      </Map>
    </>
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
