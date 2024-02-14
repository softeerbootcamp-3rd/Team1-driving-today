import styled from '@emotion/styled'
import {useEffect, useState} from 'react'
import {Map} from 'react-kakao-maps-sdk'
import {useNavigate} from 'react-router-dom'

import {Button} from '@/components/button'
import {Chip} from '@/components/chip'
import {Header} from '@/components/header'

interface ScheduleForm {
  position: Pick<GeolocationCoordinates, 'latitude' | 'longitude'>
  trainingTime: number | null
  reservationTime: number | null
  reservationDate: string
}

// NOTE: 기본위치 - 서울시청 좌표
const initialFormData: ScheduleForm = {
  position: {
    latitude: 37.566,
    longitude: 126.977,
  },
  trainingTime: null,
  reservationTime: null,
  reservationDate: '',
}

function searchPathFactory(formData: ScheduleForm) {
  const queries = {
    latitude: formData.position.latitude,
    longitude: formData.position.longitude,
    trainingTime: formData.trainingTime,
    reservationTime: formData.reservationTime,
    reservationDate: formData.reservationDate,
  }
  const searchParam = Object.entries(queries)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')

  return `/search?${searchParam}`
}

function getInitialFormDataFrom() {
  // TODO: session storage 에 저장된 정보가 있다면 반환
  return initialFormData
}

export function StudentSchedule() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<ScheduleForm>(getInitialFormDataFrom)

  useEffect(() => {
    // TODO: 위치 상태값이 채워져 있지 않을 때만 현재 위치로 초기화
    //   사용자가 승인하면 현재 위치 사용
    //   사용자가 거절하면 null 주기
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({...prev, position: position.coords}))
        },
        (error) => {
          // TODO: 에러 처리
          // 기본 위치 설정
          console.error(error)
        },
      )
    } else {
      alert('현재 위치 정보를 제공하지 않는 브라우저 입니다.')
    }
  }, [])

  return (
    <>
      <Box>
        <Header px="2rem">
          <div>
            <Header.BackButton />
          </div>
        </Header>

        <H1>연수 예약하기</H1>
        <SearchContainer>
          <SearchField>
            <SearchFieldTitle>원하는 시작 시간을 선택해주세요</SearchFieldTitle>
            <ul style={{display: 'flex', gap: 10, flexFlow: 'wrap'}}>
              {Array.from(Array(9), (_, i) => i + 9).map((time) => {
                return (
                  <li key={`time-${time}`}>
                    <Chip
                      selected={time === formData.reservationTime}
                      onClick={() => setFormData((prev) => ({...prev, reservationTime: time}))}
                    >
                      {`${time}:00`}
                    </Chip>
                  </li>
                )
              })}
            </ul>
          </SearchField>

          <SearchField>
            <SearchFieldTitle>연수 타입을 선택해주세요</SearchFieldTitle>
            <ul style={{display: 'flex', gap: 10}}>
              {Array.from(Array(2), (_, i) => i + 1).map((type) => {
                return (
                  <li key={`type-${type}`}>
                    <Chip
                      selected={type === formData.trainingTime}
                      onClick={() => setFormData((prev) => ({...prev, trainingTime: type}))}
                    >
                      {`${type} 시간`}
                    </Chip>
                  </li>
                )
              })}
            </ul>
          </SearchField>

          <SearchField>
            <SearchFieldTitle>원하는 일자를 선택해 주세요</SearchFieldTitle>
            <DateInput
              type="date"
              value={formData.reservationDate}
              onChange={(e) => setFormData((prev) => ({...prev, reservationDate: e.target.value}))}
            />
          </SearchField>

          {/* TODO: form validate */}
          <Button onClick={() => navigate(searchPathFactory(formData))}>다음</Button>
        </SearchContainer>
      </Box>
      {/* TODO: 카카오 지도 */}
      <Map
        id="map"
        center={{
          lat: formData.position?.latitude,
          lng: formData.position?.longitude,
        }}
        style={{
          width: '100%',
          height: '100%',
        }}
        level={3}
      />
    </>
  )
}

const Box = styled.section(() => ({
  width: '30%',
  minWidth: '400px',
  boxShadow: '5px 1px 5px 0px rgb(0 0 0 / 10%)',
  zIndex: 2,
}))

const H1 = styled.h1(({theme}) => ({
  color: theme.color.gray900,
  fontWeight: 'bold',
  fontSize: '2rem',
  padding: '2rem',
}))

const SearchContainer = styled.ul(({theme}) => ({
  backgroundColor: theme.color.white,
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: '100%',
  padding: '0 2rem',
}))

const SearchField = styled.div(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  border: `1px solid ${theme.color.gray200}`,
  borderRadius: '1.6rem',
  gap: '1rem',
  padding: '1rem',
}))

const SearchFieldTitle = styled.h2(({theme}) => ({
  color: theme.color.gray600,
  fontSize: '1.4rem',
  fontWeight: '500',
}))

const DateInput = styled.input(({theme}) => ({
  border: `1px solid ${theme.color.gray900}`,
  borderRadius: '0.8rem',
  padding: '0.5rem',
  width: '20rem',
}))
