import {Theme} from '@emotion/react'
import styled from '@emotion/styled'
import {CSSProperties, useState} from 'react'
import {useLoaderData, useNavigate} from 'react-router-dom'

import {Button} from '@/components/button'
import {Checkbox} from '@/components/checkbox'
import {Chip} from '@/components/chip'
import {Divider} from '@/components/divider'
import {Header} from '@/components/header'

interface LoaderData {
  instructorId: number
  reservationDate: string
  reservationTime: number
  trainingTime: number
  instructorName: string
  academyName: string
  pricePerHour: number
}

export function StudentPurchase() {
  const navigate = useNavigate()

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
        <PurchaseResult />
      </Flex>
    </Box>
  )
}

function ReservationInfo() {
  const state = useLoaderData() as LoaderData

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

function PurchaseResult() {
  const [checked, setChecked] = useState(false)
  const state = useLoaderData() as LoaderData

  const totalPrice = state.pricePerHour * state.trainingTime

  return (
    <PurchaseResultContainer>
      <Flex justifyContent="space-between">
        <Typograpy color="gray900" size="1.6rem" weight="bold">
          최종 연수 금액
        </Typograpy>
        <Typograpy color="primary" size="1.6rem" weight="bold">
          {totalPrice.toLocaleString()} 원
        </Typograpy>
      </Flex>
      <Flex alignItems="center">
        <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />
        <Typograpy color="gray900" size="1.4rem" weight="500">
          결제 내역을 확인하였으며 전자상거래법에 의거하여 환불이 진행되는 것에 동의합니다.
        </Typograpy>
      </Flex>
      <Button disabled={!checked}>{totalPrice.toLocaleString()} 원 결제하기</Button>
    </PurchaseResultContainer>
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

const PurchaseResultContainer = styled.section(() => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '2rem',
  gap: '2.4rem',
  maxWidth: '33.5rem',
  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  height: 'fit-content',
}))
