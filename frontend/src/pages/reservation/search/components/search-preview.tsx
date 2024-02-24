import styled from '@emotion/styled'
import {Link, useSearchParams} from 'react-router-dom'

import {Icon} from '@/components/icon'

export function SearchPreview() {
  const [searchParams] = useSearchParams()

  const trainingTime = Number(searchParams.get('trainingTime'))
  const reservationTime = Number(searchParams.get('reservationTime'))
  const reservationDate = searchParams.get('reservationDate') as string

  return (
    <StyledLink to="/reservation">
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
    </StyledLink>
  )
}

const StyledLink = styled(Link)(({theme}) => ({
  border: `1px solid ${theme.color.primary}`,
  borderRadius: '0.8rem',
  backgroundColor: theme.color.white,
  padding: '2rem 0',
  margin: '2rem 0',
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
