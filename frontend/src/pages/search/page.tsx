import styled from '@emotion/styled'
import {Map} from 'react-kakao-maps-sdk'
import {useSearchParams} from 'react-router-dom'

import {Card} from '@/components/card'
import {Divider} from '@/components/divider'
import {Header} from '@/components/header'
import {Icon} from '@/components/icon'

import {dummydata} from './data'

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  // TODO: searchParms 가 모두 있는지 확인, 없다면 이전 페이지로 redirect
  const trainingTime = Number(searchParams.get('trainingTime'))
  const reservationTime = Number(searchParams.get('reservationTime'))
  const latitude = Number(searchParams.get('latitude'))
  const longitude = Number(searchParams.get('longitude'))
  const reservationDate = searchParams.get('reservationDate')

  // TODO: 지도 드래그를 통한 주소 검색

  return (
    <>
      <Box>
        <Header px="2rem">
          <div style={{padding: '2rem 0'}}>
            <Header.BackButton />
          </div>
        </Header>

        <H1>강사 선택</H1>
        <SearchContainer>
          <SearchPreview />

          <Divider />

          <ul
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            {dummydata.map((instructor) => {
              return (
                <Card.ReservationResult
                  key={instructor.instructorId}
                  instructorName={instructor.instructorName}
                  academyName={instructor.academyName}
                  image={instructor.instructorImage}
                  pricePerHour={instructor.pricePerHour}
                  distance={instructor.distance}
                  duration={trainingTime}
                  rating={2}
                />
              )
            })}
          </ul>
        </SearchContainer>
      </Box>

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
        level={3} // 지도의 확대 레벨
      />
    </>
  )
}

function SearchPreview() {
  const [searchParams] = useSearchParams()

  const trainingTime = Number(searchParams.get('trainingTime'))
  const reservationTime = Number(searchParams.get('reservationTime'))
  const reservationDate = searchParams.get('reservationDate') as string

  return (
    <Container>
      <div>
        <Icon name="date" color="primary" width="1.5rem" height="1.5rem" />
        <span>{new Date(reservationDate).toLocaleDateString('ko-KR')}</span>
      </div>
      <div>
        <Icon name="time" color="primary" width="1.5rem" height="1.5rem" />
        <span>{reservationTime}:00</span>
      </div>
      <div>
        <Icon name="duration" color="primary" width="1.5rem" height="1.5rem" />
        <span>{trainingTime}시간</span>
      </div>
    </Container>
  )
}

const Box = styled.section(() => ({
  width: '30%',
  minWidth: '60rem',
  boxShadow: '5px 1px 5px 0px rgb(0 0 0 / 10%)',
  zIndex: 2,
  display: 'flex',
  flexDirection: 'column',
}))

const Container = styled.button(({theme}) => ({
  position: 'sticky',
  top: 0,
  border: `1px solid ${theme.color.primary}`,
  borderRadius: '0.8rem',
  backgroundColor: theme.color.white,
  padding: '2rem 0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: theme.color.primary,
  fontSize: '1.4rem',
  '&:hover': {
    backgroundColor: theme.color.gray100,
  },
  '&:active': {
    backgroundColor: theme.color.gray200,
  },
  '& > div': {
    gap: '0.5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '1.4rem',
    padding: '0 1rem',
  },
  '& > * + *': {
    borderRight: 0,
    borderLeft: `1px solid ${theme.color.primary}`,
  },
}))

const H1 = styled.h1(({theme}) => ({
  color: theme.color.gray900,
  backgroundColor: theme.color.white,
  fontWeight: 'bold',
  fontSize: '2rem',
  padding: '2rem',
  position: 'sticky',
  top: 0,
}))

const SearchContainer = styled.ul(({theme}) => ({
  backgroundColor: theme.color.white,
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: '100%',
  flexGrow: 1,
  overflowY: 'scroll',
  padding: '0 2rem',
}))
