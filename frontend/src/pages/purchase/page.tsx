import {Theme} from '@emotion/react'
import styled from '@emotion/styled'
import {CSSProperties, useEffect, useState} from 'react'
import {Location, useLocation, useNavigate} from 'react-router-dom'

import {Button} from '@/components/button'
import {Checkbox} from '@/components/checkbox'
import {Chip} from '@/components/chip'
import {Divider} from '@/components/divider'
import {Header} from '@/components/header'
import {
  isString,
  isValidReservationDate,
  isValidReservationTime,
  isValidTrainingTime,
} from '@/utils/validate'

interface State {
  instructorId: number
  reservationDate: string
  reservationTime: number
  trainingTime: number
  instructorName: string
  academyName: string
}

export function StudentPurchase() {
  const {state} = useLocation() as Location<State | null>
  const navigate = useNavigate()

  useEffect(() => {
    if (
      state !== null &&
      isValidTrainingTime(state.trainingTime) &&
      isValidReservationTime(state.reservationTime) &&
      isValidReservationDate(state.reservationDate) &&
      !isNaN(state.instructorId) &&
      isString(state.instructorName) &&
      isString(state.academyName)
    ) {
      return
    }
    navigate('/schedule')
  }, [navigate, state])

  return (
    <Box>
      <Header px="20rem">
        <div>
          <Header.BackButton onClick={() => navigate(-1)} />
        </div>
      </Header>

      <Flex justifyContent="center" gap="4rem" style={{marginTop: '3rem'}}>
        <Flex flexDirection="column" gap="2rem">
          <ReservationInfo />
          <PaymentMethod />
        </Flex>
        <PurcheseResult />
      </Flex>
    </Box>
  )
}

function ReservationInfo() {
  const {state} = useLocation() as Location<State | null>

  if (state === null) {
    return null
  }

  return (
    <ReservationInfoContainer>
      <Typograpy color="gray900" size="1.6rem" weight="bold">
        수업 예약 정보
      </Typograpy>
      <Flex>
        <Typograpy color="gray600" size="1.4rem" weight="500" style={{width: '10rem'}}>
          강사
        </Typograpy>
        <Typograpy color="gray900" size="1.4rem" weight="500" style={{width: '20rem'}}>
          {state.instructorName}
        </Typograpy>
      </Flex>
      <Flex>
        <Typograpy color="gray600" size="1.4rem" weight="500" style={{width: '10rem'}}>
          학원
        </Typograpy>
        <Typograpy color="gray900" size="1.4rem" weight="500" style={{width: '20rem'}}>
          {state.academyName}
        </Typograpy>
      </Flex>
      <Flex>
        <Typograpy color="gray600" size="1.4rem" weight="500" style={{width: '10rem'}}>
          수업길이
        </Typograpy>
        <Typograpy color="gray900" size="1.4rem" weight="500" style={{width: '20rem'}}>
          {state.trainingTime}시간
        </Typograpy>
      </Flex>
      <Flex>
        <Typograpy color="gray600" size="1.4rem" weight="500" style={{width: '10rem'}}>
          수업시간
        </Typograpy>
        <Typograpy color="gray900" size="1.4rem" weight="500" style={{width: '20rem'}}>
          {state.reservationDate} {state.reservationTime}시 ~{' '}
          {state.reservationTime + state.trainingTime}시
        </Typograpy>
      </Flex>
    </ReservationInfoContainer>
  )
}

function PaymentMethod() {
  return (
    <PaymentMethodContainer>
      <Typograpy color="gray900" size="1.6rem" weight="bold">
        결제 방식
      </Typograpy>
      <Divider />
      <Typograpy color="gray900" size="1.6rem" weight="500">
        간편 결제
      </Typograpy>
      <Flex gap="0.6rem">
        <Chip large selected>
          토스 페이먼츠
        </Chip>
        <Chip large>카카오페이</Chip>
      </Flex>
    </PaymentMethodContainer>
  )
}

function PurcheseResult() {
  const [checked, setChecked] = useState(false)

  return (
    <PurcheseResultContainer>
      <Flex justifyContent="space-between">
        <Typograpy color="gray900" size="1.6rem" weight="bold">
          최종 연수 금액
        </Typograpy>
        <Typograpy color="primary" size="1.6rem" weight="bold">
          {Number(320000).toLocaleString()} 원
        </Typograpy>
      </Flex>
      <Flex alignItems="center">
        <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />
        <Typograpy color="gray900" size="1.4rem" weight="500">
          결제 내역을 확인하였으며 전자상거래법에 의거하여 환불이 진행되는 것에 동의합니다.
        </Typograpy>
      </Flex>
      <Button disabled={!checked}>{Number(320000).toLocaleString()} 원 결제하기</Button>
    </PurcheseResultContainer>
  )
}
const Box = styled.div(() => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
}))

type FlexProps = Pick<
  CSSProperties,
  'justifyContent' | 'alignItems' | 'flexDirection' | 'flexWrap' | 'flexGrow' | 'gap'
>
const Flex = styled.div<FlexProps>(
  ({justifyContent, alignItems, flexDirection, flexGrow, flexWrap, gap}) => ({
    display: 'flex',
    justifyContent,
    alignItems,
    flexDirection,
    flexGrow,
    flexWrap,
    gap,
  }),
)

const Typograpy = styled.span<{
  color: keyof Theme['color']
  size: CSSProperties['fontSize']
  weight: CSSProperties['fontWeight']
}>(({theme, color, size, weight}) => ({
  color: theme.color[color],
  fontSize: size,
  fontWeight: weight,
}))

const ReservationInfoContainer = styled.section(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '2rem',
  gap: '0.4rem',
  borderRadius: '1.6rem',
  minWidth: '44.8rem',
  border: `1px solid ${theme.color.gray200}`,
}))

const PaymentMethodContainer = styled.section(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '2rem',
  gap: '1rem',
  borderRadius: '1.6rem',
  minWidth: '44.8rem',
  border: `1px solid ${theme.color.gray200}`,
}))

const PurcheseResultContainer = styled.section(() => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '2rem',
  gap: '2.4rem',
  maxWidth: '33.5rem',
  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  height: 'fit-content',
}))
