import styled from '@emotion/styled'
import {useState} from 'react'
import {Map} from 'react-kakao-maps-sdk'
import {useNavigate} from 'react-router-dom'

import {Button} from '@/components/button'
import {Chip} from '@/components/chip'
import {Header} from '@/components/header'

import {type Coord, useCurrentPosition} from './hooks'

interface ScheduleForm {
  trainingTime: number | null
  reservationTime: number | null
  reservationDate: string
}
type ScheduleFormError = {
  [key in keyof ScheduleForm]?: {
    type: string
    message: string
  }
}

// NOTE: 기본위치 - 서울시청 좌표
const defaultPosition = {
  latitude: 37.566,
  longitude: 126.977,
}
const initialFormData: ScheduleForm = {
  trainingTime: null,
  reservationTime: null,
  reservationDate: '',
}

function searchPathFactory({coord, formData}: {coord: Coord; formData: ScheduleForm}) {
  const queries = {
    latitude: coord.latitude,
    longitude: coord.longitude,
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

function validate(formData: ScheduleForm): ScheduleFormError | null {
  const validReservationDate = formData.reservationDate !== ''
  const validReservationTime = formData.reservationTime !== null
  const validTrainingTime = formData.trainingTime !== null

  if (validReservationDate && validReservationTime && validTrainingTime) return null

  const errors = {} as ScheduleFormError
  if (!validReservationDate) {
    errors.reservationDate = {type: 'required', message: '예약 날짜를 입력해주세요.'}
  }
  if (!validReservationTime) {
    errors.reservationTime = {type: 'required', message: '원하는 시작 시간을 선택해주세요.'}
  }
  if (!validTrainingTime) {
    errors.trainingTime = {type: 'required', message: '연수 타입을 선택해주세요.'}
  }
  return errors
}

export function StudentSchedule() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<ScheduleForm>(getInitialFormDataFrom)
  const [formErrors, setFormErrors] = useState<ScheduleFormError>()
  const coord = useCurrentPosition({defaultPosition})

  const handleSubmit = () => {
    const errors = validate(formData)
    if (errors) {
      setFormErrors(errors)
      return
    }
    navigate(searchPathFactory({coord, formData}))
  }

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
          <SearchField className={formErrors?.reservationDate?.type === 'required' ? 'error' : ''}>
            <SearchFieldTitle>원하는 일자를 선택해 주세요</SearchFieldTitle>
            <DateInput
              type="date"
              value={formData.reservationDate}
              onChange={(e) => {
                setFormData((prev) => ({...prev, reservationDate: e.target.value}))
                setFormErrors((prev) => (prev ? {...prev, reservationDate: undefined} : prev))
              }}
            />
            {formErrors?.reservationDate?.type === 'required' && (
              <ErrorMessage>{formErrors.reservationDate.message}</ErrorMessage>
            )}
          </SearchField>

          <SearchField className={formErrors?.reservationTime?.type === 'required' ? 'error' : ''}>
            <SearchFieldTitle>원하는 시작 시간을 선택해주세요</SearchFieldTitle>
            <ul style={{display: 'flex', gap: 10, flexFlow: 'wrap'}}>
              {Array.from(Array(9), (_, i) => i + 9).map((time) => {
                return (
                  <li key={`time-${time}`}>
                    <Chip
                      selected={time === formData.reservationTime}
                      onClick={() => {
                        setFormData((prev) => ({...prev, reservationTime: time}))
                        setFormErrors((prev) =>
                          prev ? {...prev, reservationTime: undefined} : prev,
                        )
                      }}
                    >
                      {`${time}:00`}
                    </Chip>
                  </li>
                )
              })}
            </ul>
            {formErrors?.reservationTime?.type === 'required' && (
              <ErrorMessage>{formErrors.reservationTime.message}</ErrorMessage>
            )}
          </SearchField>

          <SearchField className={formErrors?.trainingTime?.type === 'required' ? 'error' : ''}>
            <SearchFieldTitle>연수 타입을 선택해주세요</SearchFieldTitle>
            <ul style={{display: 'flex', gap: 10}}>
              {Array.from(Array(2), (_, i) => i + 1).map((type) => {
                return (
                  <li key={`type-${type}`}>
                    <Chip
                      selected={type === formData.trainingTime}
                      onClick={() => {
                        setFormData((prev) => ({...prev, trainingTime: type}))
                        setFormErrors((prev) => (prev ? {...prev, trainingTime: undefined} : prev))
                      }}
                    >
                      {`${type} 시간`}
                    </Chip>
                  </li>
                )
              })}
            </ul>
            {formErrors?.trainingTime?.type === 'required' && (
              <ErrorMessage>{formErrors.trainingTime.message}</ErrorMessage>
            )}
          </SearchField>

          <Button onClick={handleSubmit}>다음</Button>
        </SearchContainer>
      </Box>

      <Map
        id="map"
        center={{
          lat: coord.latitude,
          lng: coord.longitude,
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
  '&.error': {
    border: `1.5px solid ${theme.color.warning}`,
  },
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
  fontSize: '1.4rem',
}))

const ErrorMessage = styled.p(({theme}) => ({
  fontSize: '1.4rem',
  color: theme.color.warning,
}))
