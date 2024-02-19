import {useMemo, useReducer} from 'react'

import {Button} from '@/components/button'

import {CalendarComponents as Comp, dateReducer, formatDate, getWeeks} from '.'

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
    <Comp.Container>
      <Comp.Header>
        <h1>
          {year}년 {month}월
        </h1>
        <Comp.ButtonsContainer>
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
        </Comp.ButtonsContainer>
      </Comp.Header>
      <Comp.CalendarDiv>
        {weeks.map((week, wi) => (
          <Comp.WeekDiv key={`${year}-${month}-${wi}`}>
            {week.map((day, di) => {
              // cell
              if (day) {
                const formattedDate = formatDate(year, month, day)
                return (
                  <Comp.Cell
                    selected={day === currentDay && year === currentYear && month === currentMonth}
                    onClick={() => onDateClick?.(formattedDate)}
                    key={formattedDate}
                    day={day}
                    schedules={schedules?.[formattedDate]}
                    onScheduleClick={onScheduleClick}
                  />
                )
              }
              // blank
              return <Comp.Cell key={`${wi}-${di}`} />
            })}
          </Comp.WeekDiv>
        ))}
      </Comp.CalendarDiv>
    </Comp.Container>
  )
}

export interface ReservationSchedule {
  reservationId: number
  time: number
  duration: number
}
