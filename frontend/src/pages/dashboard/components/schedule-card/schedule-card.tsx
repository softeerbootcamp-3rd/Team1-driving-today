import styled from '@emotion/styled'

import {Button} from '@/components/button'
import {Card} from '@/components/card'
import {Icon} from '@/components/icon'

export function ScheduleCard() {
  // todo: do actual API call
  // const {data, loading, reload} = useApiCall()
  const data = {
    reservationId: 1,
    instructorImage: 'https://picsum.photos/200',
    instructorName: '오정진',
    academyName: '학원',
    reservationDate: '2024-02-15',
    reservationTime: 12,
    trainingTime: 1,
    instructorId: 1,
  }
  const loading = false
  const reload = () => {}

  const onCancelClick = async () => {
    // todo: delete api call
    // const res = await apiCall(`/reservations/${data.reservationId}`, {
    //   method: 'DELETE',
    // })
    reload()
  }

  return (
    <Container>
      {!loading &&
        (data ? (
          <>
            <BoldLabel>운전 연수가 예정되어 있어요</BoldLabel>
            <Card.StudentHistory
              style={{width: '100%'}}
              instructorName={data.instructorName}
              academyName={data.academyName}
              dateStr={data.reservationDate}
              timeStr={timeToStr(data.reservationTime, data.trainingTime)}
              image={data.instructorImage}
            />
            <ActionsContainer>
              <Button style={{width: 'auto'}} bgColor="warning" onClick={onCancelClick}>
                예약 취소하기
              </Button>
            </ActionsContainer>
          </>
        ) : (
          <>
            <Icon name="car" color="black" width="2.8rem" height="2.8rem" />
            <BoldLabel>예정된 연수가 없어요</BoldLabel>
            <Label>지금 바로 운전 연수를 예약해보세요</Label>
            <Button>운전 연수 예약하기</Button>
          </>
        ))}
    </Container>
  )
}

const Container = styled.div(({theme}) => ({
  width: '100%',
  borderRadius: '1.6rem',
  border: `1px solid ${theme.color.gray200}`,
  padding: '3rem 2rem',
  gap: '1rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyItems: 'center',
}))

const BoldLabel = styled.p(({theme}) => ({
  color: theme.color.gray900,
  fontWeight: 700,
  fontSize: '1.6rem',
  width: '100%',
}))

const Label = styled.p(({theme}) => ({
  color: theme.color.gray900,
  fontWeight: 500,
  fontSize: '1.6rem',
}))

const ActionsContainer = styled.div({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
})

function timeToStr(reservationTime: number, trainingTime: number) {
  return `${reservationTime}시~${reservationTime + trainingTime}시 (${trainingTime}시간)`
}
