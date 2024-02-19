import styled from '@emotion/styled'
import confetti from 'canvas-confetti'
import {useEffect} from 'react'
import {useNavigate, useSearchParams} from 'react-router-dom'

import {Button} from '@/components/button'
import {Flex} from '@/components/flex'
import {Typography} from '@/components/typography'

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export function PurcheseSuccessPage() {
  useEffect(() => {
    const handleClickConfetti = (event: MouseEvent) => {
      const x = event.x / window.innerWidth
      const y = event.y / window.innerHeight
      confetti({
        angle: randomInRange(55, 125),
        spread: randomInRange(50, 70),
        particleCount: randomInRange(50, 100),
        origin: {x, y},
      })
    }
    window.addEventListener('click', handleClickConfetti)
    return () => window.removeEventListener('click', handleClickConfetti)
  }, [])

  return <ReservationInfo />
}

function ReservationInfo() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const instructorName = searchParams.get('instructorName')
  const academyName = searchParams.get('academyName')
  const trainingTime = searchParams.get('trainingTime')
  const reservationDate = searchParams.get('reservationDate')
  const reservationTime = searchParams.get('reservationTime')

  return (
    <ReservationInfoContainer>
      <Typography color="gray900" size="2.4rem" weight="bold" style={{marginBottom: '5rem'}}>
        운전 연수 결제가 완료됐어요!
      </Typography>
      <Flex>
        <Typography color="gray600" size="1.6rem" weight="500" style={{width: '15rem'}}>
          강사
        </Typography>
        <Typography color="gray900" size="1.6rem" weight="500" style={{width: '20rem'}}>
          {instructorName}
        </Typography>
      </Flex>
      <Flex>
        <Typography color="gray600" size="1.6rem" weight="500" style={{width: '15rem'}}>
          학원
        </Typography>
        <Typography color="gray900" size="1.6rem" weight="500" style={{width: '20rem'}}>
          {academyName}
        </Typography>
      </Flex>
      <Flex>
        <Typography color="gray600" size="1.6rem" weight="500" style={{width: '15rem'}}>
          수업길이
        </Typography>
        <Typography color="gray900" size="1.6rem" weight="500" style={{width: '20rem'}}>
          {trainingTime}시간
        </Typography>
      </Flex>
      <Flex>
        <Typography color="gray600" size="1.6rem" weight="500" style={{width: '15rem'}}>
          수업시간
        </Typography>
        <Typography color="gray900" size="1.4rem" weight="500" style={{width: '20rem'}}>
          {reservationDate} {Number(reservationTime)}시 ~{' '}
          {Number(reservationTime) + Number(trainingTime)}시
        </Typography>
      </Flex>
      <Flex style={{marginTop: '10rem', width: '20rem'}}>
        <Button onClick={() => navigate('/dashboard', {replace: true})}>홈으로 돌아가기</Button>
      </Flex>
    </ReservationInfoContainer>
  )
}

const ReservationInfoContainer = styled.section(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem',
  gap: '1rem',
  borderRadius: '1.6rem',
  flex: '1 1 0',
}))
