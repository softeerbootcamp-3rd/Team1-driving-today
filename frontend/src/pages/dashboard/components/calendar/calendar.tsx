import styled from '@emotion/styled'
import {HTMLAttributes, useMemo, useReducer} from 'react'

import {Button} from '@/components/button'

interface CalendarProps {
  year: number
  month: number
  day?: number
  schedules?: Record<string, ReservationSchedule[]>
  onDateClick?: (date: string) => void
  onScheduleClick?: (schedule: ReservationSchedule) => void
}

export function Calendar({
  year: currentYear,
  month: currentMonth,
  day: currentDay,
  schedules,
  onDateClick,
  onScheduleClick,
}: CalendarProps) {
  const [{year, month}, dateDispatch] = useReducer(dateReducer, {
    year: currentYear,
    month: currentMonth,
  })
  const {weeks} = useMemo(() => getWeeks(year, month), [month, year])

  return (
    <Container>
      <Header>
        <h1>
          {year}년 {month}월
        </h1>
        <ButtonsContainer>
          <Button
            bgColor="white"
            color="primary"
            style={{width: 'auto'}}
            onClick={() => dateDispatch({type: 'PREV_MONTH'})}
          >
            {`<`}
          </Button>
          <Button
            style={{width: 'auto'}}
            onClick={() =>
              dateDispatch({type: 'SET_DATE', payload: {year: currentYear, month: currentMonth}})
            }
          >
            오늘
          </Button>
          <Button
            bgColor="white"
            color="primary"
            style={{width: 'auto'}}
            onClick={() => dateDispatch({type: 'NEXT_MONTH'})}
          >
            {`>`}
          </Button>
        </ButtonsContainer>
      </Header>
      <CalendarDiv>
        {weeks.map((week, wi) => (
          <WeekDiv key={`${year}-${month}-${wi}`}>
            {week.map((day, di) => {
              // cell
              if (day) {
                const formattedDate = formatDate(year, month, day)
                return (
                  <Cell
                    selected={day === currentDay && year === currentYear && month === currentMonth}
                    onClick={() => onDateClick?.(formattedDate)}
                    key={formattedDate}
                    day={day}
                    schedules={schedules?.[formattedDate]}
                    scheduleClickHandler={onScheduleClick}
                  />
                )
              }
              // blank
              return <Cell key={`${wi}-${di}`} />
            })}
          </WeekDiv>
        ))}
      </CalendarDiv>
    </Container>
  )
}

interface DatePickerProps {
  defaultValue: string
  value?: string
  onChange?: (date: string) => void
  minDate?: string
  maxDate?: string
}

export function DatePicker({
  defaultValue,
  value,
  onChange,
  minDate: minDateStr,
  maxDate: maxDateStr,
}: DatePickerProps) {
  const {year: defaultYear, month: defaultMonth} = parseDateString(defaultValue)
  const {
    year: selectedYear,
    month: selectedMonth,
    day: selectedDay,
  } = parseDateString(value ?? defaultValue)

  const [{year: showYear, month: showMonth}, dateDispatch] = useReducer(dateReducer, {
    year: defaultYear,
    month: defaultMonth,
  })

  const minDate = minDateStr ? parseDateString(minDateStr) : undefined
  const maxDate = maxDateStr ? parseDateString(maxDateStr) : undefined

  const {weeks} = useMemo(() => getWeeks(showYear, showMonth), [showYear, showMonth])

  return (
    <Container>
      <Header>
        <h1>
          {showYear}년 {showMonth}월
        </h1>
        <ButtonsContainer>
          <Button
            bgColor="white"
            color="primary"
            style={{width: 'auto'}}
            onClick={() => dateDispatch({type: 'PREV_MONTH'})}
          >
            {`<`}
          </Button>
          <Button
            style={{width: 'auto'}}
            onClick={() =>
              dateDispatch({type: 'SET_DATE', payload: {year: defaultYear, month: defaultMonth}})
            }
          >
            오늘
          </Button>
          <Button
            bgColor="white"
            color="primary"
            style={{width: 'auto'}}
            onClick={() => dateDispatch({type: 'NEXT_MONTH'})}
          >
            {`>`}
          </Button>
        </ButtonsContainer>
      </Header>
      <CalendarDiv>
        {weeks.map((week, wi) => (
          <WeekDiv key={`${showYear}-${showMonth}-${wi}`}>
            {week.map((day, di) => {
              // cell
              if (day) {
                const formattedDate = formatDate(showYear, showMonth, day)
                const date = new Date(showYear, showMonth - 1, day)
                return (
                  <Cell
                    disabled={!isDateInRange(date, minDate?.date, maxDate?.date)}
                    selected={
                      day === selectedDay &&
                      showYear === selectedYear &&
                      showMonth === selectedMonth
                    }
                    onClick={() => onChange?.(formattedDate)}
                    key={formattedDate}
                    day={day}
                    type="SMALL"
                  />
                )
              }
              // blank
              return <Cell type="SMALL" key={`${wi}-${di}`} />
            })}
          </WeekDiv>
        ))}
      </CalendarDiv>
    </Container>
  )
}

interface CellProps extends HTMLAttributes<HTMLDivElement> {
  day?: number
  disabled?: boolean
  schedules?: ReservationSchedule[]
  type?: 'SMALL' | 'LARGE'
  selected?: boolean
  scheduleClickHandler?: (schedule: ReservationSchedule) => void
}

function Cell({day, schedules, scheduleClickHandler, ...props}: CellProps) {
  // schedules에 맞게 점유된 시간 색칠 & click event
  return (
    <CellContainer disabled={day === undefined} {...props}>
      {schedules?.map((v) => (
        <CellSlice
          key={v.reservationId}
          start={v.time}
          duration={v.duration}
          onClick={() => scheduleClickHandler?.(v)}
        />
      ))}
      {day && <CellLabel>{day}</CellLabel>}
    </CellContainer>
  )
}

const CellLabel = styled.p(({theme}) => ({
  pointerEvents: 'none',
  userSelect: 'none',
  fontSize: '3rem',
  color: theme.color.gray700,
  opacity: 0.8,
  position: 'absolute',
  transform: 'translateY(-50%)',
  top: '50%',
}))

interface CellSliceProps {
  start: number
  duration: number
}

const CellSlice = styled.div<CellSliceProps>(({theme, start, duration}) => ({
  cursor: 'pointer',
  boxSizing: 'border-box',
  position: 'absolute',
  backgroundColor: theme.color.primary,
  opacity: 0.6,
  width: '9rem',
  height: `${duration}rem`,
  top: `${start - 9}rem`,
  ':hover': {
    opacity: 1,
  },
}))

interface CellContainerProps {
  disabled?: boolean
  type?: 'SMALL' | 'LARGE'
  selected?: boolean
}

const CellContainer = styled.div<CellContainerProps>(
  ({disabled, theme, selected, type = 'LARGE'}) => {
    const size = type === 'LARGE' ? '9rem' : '5rem'
    return {
      boxSizing: 'border-box',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      width: size,
      height: size,
      borderLeft: `1px solid ${theme.color.white}`,
      position: 'relative',
      overflow: 'hidden',
      ':first-of-type': {
        borderLeft: 'none',
      },
      backgroundColor: disabled
        ? theme.color.gray300
        : selected
        ? theme.color.white
        : 'transparent',
      pointerEvents: disabled ? 'none' : 'auto',
      ':hover': {
        backgroundColor: theme.color.gray100,
      },
    }
  },
)

const Container = styled.div({
  display: 'inline-flex',
  alignItems: 'center',
  flexDirection: 'column',
})

const Header = styled.div({
  padding: '1rem',
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  '& > h1': {
    fontSize: '2rem',
  },
})

const ButtonsContainer = styled.div({
  display: 'flex',
  gap: '0.1rem',
})

const CalendarDiv = styled.div(({theme}) => ({
  backgroundColor: theme.color.gray200,
  width: 'auto',
  borderRadius: '1rem',
  overflow: 'hidden',
  border: `1px solid ${theme.color.white}`,
}))

const WeekDiv = styled.div(({theme}) => ({
  display: 'flex',
  borderTop: `1px solid ${theme.color.white}`,
  ':first-of-type': {borderTop: 'none'},
}))

function formatDate(year: number, month: number, day: number) {
  return `${('0000' + year).slice(-4)}-${('00' + month).slice(-2)}-${('00' + day).slice(-2)}`
}

function getWeeks(year: number, month: number) {
  const date = new Date(year, month, 0)
  const daysCount = date.getDate()
  date.setDate(1)
  const offset = date.getDay() - 1
  const weeks = Array.from({length: 6}, (_, w) =>
    Array.from({length: 7}, (_v, i) => {
      const day = w * 7 + i - offset
      return day < 1 || day > daysCount ? null : day
    }),
  )
  return {weeks}
}

interface DateState {
  year: number
  month: number
}

type DateAction =
  | {type: 'NEXT_MONTH'}
  | {type: 'PREV_MONTH'}
  | {type: 'SET_DATE'; payload: DateState}

function dateReducer(state: DateState, action: DateAction) {
  if (action.type === 'NEXT_MONTH') {
    const newMonth = state.month + 1
    return {
      year: newMonth > 12 ? state.year + 1 : state.year,
      month: newMonth > 12 ? 1 : newMonth,
    }
  } else if (action.type === 'PREV_MONTH') {
    const newMonth = state.month - 1
    return {
      year: newMonth < 1 ? state.year - 1 : state.year,
      month: newMonth < 1 ? 12 : newMonth,
    }
  } else if (action.type === 'SET_DATE') {
    return action.payload
  }
  return state
}

export interface ReservationSchedule {
  reservationId: number
  time: number
  duration: number
}

function parseDateString(dateStr: string) {
  const date = new Date(dateStr)
  return {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate(), date}
}

function isDateInRange(date: Date, minDate?: Date, maxDate?: Date) {
  if (minDate && date < minDate) return false
  if (maxDate && date > maxDate) return false
  return true
}
