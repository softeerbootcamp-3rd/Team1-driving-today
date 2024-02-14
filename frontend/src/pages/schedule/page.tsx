import styled from '@emotion/styled'
import {useEffect, useState} from 'react'
import {useSearchParams} from 'react-router-dom'

import {Button} from '@/components/button'
import {Chip} from '@/components/chip'
import {Header} from '@/components/header'

interface Position {
  latitude: number
  longitude: number
}
interface ScheduleForm {
  position: Position | null
  trainingTime: number | null
  reservationTime: number | null
  reservationDate: string
}
const initialFormData: ScheduleForm = {
  position: {
    latitude: 36,
    longitude: 120,
  },
  trainingTime: 1,
  reservationTime: 12,
  reservationDate: '2024-02-23',
}

function getInitialFormDataFrom() {
  // TODO: session storage 에 저장된 정보가 있다면 반환
  return initialFormData
}

export function StudentSchedule() {
  // const [searchParam, setSearchParam] = useSearchParams()
  const [formData, setFormData] = useState<ScheduleForm>(getInitialFormDataFrom)

  useEffect(() => {
    // TODO: 위치 상태값이 채워져 있지 않을 때만 현재 위치로 초기화
    //   사용자가 승인하면 현재 위치 사용
    //   사용자가 거절하면 null 주기
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({...prev, position: position.coords}))
          console.log(position)
        },
        (error) => {
          // TODO: 에러 처리
          console.error(error)
        },
      )
    } else {
      alert('현재 위치 정보를 제공하지 않는 브라우저 입니다.')
    }
  }, [])

  return (
    <>
      <section>
        <Header px="2rem">
          <div>
            <Header.BackButton />
          </div>
        </Header>

        <H1>연수 예약하기</H1>
        <SearchContainer>
          <SearchField>
            <SearchFieldTitle>원하는 시작 시간을 선택해주세요</SearchFieldTitle>
            <ul style={{display: 'flex', gap: 10}}>
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

          <Button onClick={() => console.log('next')}>다음</Button>
        </SearchContainer>
      </section>
      {/* TODO: 카카오 지도 */}
    </>
  )
}

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
