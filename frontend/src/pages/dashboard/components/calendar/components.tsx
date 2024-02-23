import styled from '@emotion/styled'
import {HTMLAttributes} from 'react'

import {ReservationSchedule} from '.'

interface CellProps extends HTMLAttributes<HTMLDivElement> {
  day?: number
  disabled?: boolean
  schedules?: ReservationSchedule[]
  size?: 'small' | 'large'
  selected?: boolean
  onScheduleClick?: (schedule: ReservationSchedule) => void
}

function Cell({day, schedules, onScheduleClick, ...props}: CellProps) {
  // schedules에 맞게 점유된 시간 색칠 & click event
  return (
    <CellContainer disabled={day === undefined} {...props}>
      {schedules?.map((v) => (
        <CellSlice
          key={v.reservationId}
          start={v.time}
          duration={v.duration}
          onClick={() => onScheduleClick?.(v)}
        />
      ))}
      {day && <CellLabel size={props.size}>{day}</CellLabel>}
    </CellContainer>
  )
}

interface CellLabelProps {
  size?: 'small' | 'large'
}

const CellLabel = styled.p<CellLabelProps>(({theme, size = 'large'}) => ({
  pointerEvents: 'none',
  userSelect: 'none',
  fontSize: size === 'large' ? '3rem' : '1.5rem',
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
  size?: 'small' | 'large'
  selected?: boolean
}

const CellContainer = styled.div<CellContainerProps>(
  ({disabled, theme, selected, size = 'large'}) => {
    const dimension = size === 'large' ? '9rem' : '5rem'
    return {
      boxSizing: 'border-box',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      width: dimension,
      height: dimension,
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

export const CalendarComponents = {
  CellContainer,
  Cell,
  CellLabel,
  CellSlice,
  Container,
  Header,
  ButtonsContainer,
  CalendarDiv,
  WeekDiv,
}
