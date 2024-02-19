import {useMemo, useReducer} from 'react'

import {Button} from '@/components/button'

import {
  CalendarComponents as Comp,
  dateReducer,
  formatDate,
  getWeeks,
  isDateInRange,
  parseDateString,
} from '.'

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
    <Comp.Container>
      <Comp.Header>
        <h1>
          {showYear}년 {showMonth}월
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
        </Comp.ButtonsContainer>
      </Comp.Header>
      <Comp.CalendarDiv>
        {weeks.map((week, wi) => (
          <Comp.WeekDiv key={`${showYear}-${showMonth}-${wi}`}>
            {week.map((day, di) => {
              // cell
              if (day) {
                const formattedDate = formatDate(showYear, showMonth, day)
                const date = new Date(showYear, showMonth - 1, day)
                return (
                  <Comp.Cell
                    disabled={!isDateInRange(date, minDate?.date, maxDate?.date)}
                    selected={
                      day === selectedDay &&
                      showYear === selectedYear &&
                      showMonth === selectedMonth
                    }
                    onClick={() => onChange?.(formattedDate)}
                    key={formattedDate}
                    day={day}
                    size="small"
                  />
                )
              }
              // blank
              return <Comp.Cell size="small" key={`${wi}-${di}`} />
            })}
          </Comp.WeekDiv>
        ))}
      </Comp.CalendarDiv>
    </Comp.Container>
  )
}
