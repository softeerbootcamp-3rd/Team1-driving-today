import styled from '@emotion/styled'

import {Divider} from '@/components/divider'
import {Icon} from '@/components/icon'

interface MyInfoResponse {
  name: string
  image: string
  nickname: string
}
export function MyProfileCard() {
  // todo: use actual API
  // const {data} = useFetch()
  const data: MyInfoResponse = {
    name: '오정진',
    image: '',
    nickname: 'ojj1123',
  }

  return (
    <Container>
      {data && (
        <>
          <Image src={data.image} />
          <NameContainer>
            <Name>{`안녕하세요 ${data.name}님!`}</Name>
            <Nickname>{`@${data.nickname}`}</Nickname>
          </NameContainer>
          <Divider flexItem />
          <TrailingIconLink href="/history">
            <ButtonLabel>지난 예약 내역</ButtonLabel>
            <Icon name="arrowForward" color="gray600" width="1.6rem" height="1.6rem" />
          </TrailingIconLink>
        </>
      )}
    </Container>
  )
}

const Container = styled.div(({theme}) => ({
  borderRadius: '1.6rem',
  width: '100%',
  border: `1px solid ${theme.color.gray200}`,
  display: 'flex',
  flexDirection: 'column',
  padding: '3rem',
  gap: '2rem',
  alignItems: 'center',
}))

const Image = styled.img(({theme}) => ({
  backgroundColor: theme.color.gray300,
  width: '10rem',
  height: '10rem',
  borderRadius: '50%',
  overflow: 'hidden',
  objectFit: 'contain',
}))

const NameContainer = styled.div({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: '0.4rem 0',
  gap: '0.4rem',
})

const TrailingIconLink = styled.a({
  cursor: 'pointer',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1.6rem 0',
})

const Name = styled.p(({theme}) => ({
  color: theme.color.gray600,
  fontSize: '2.4rem',
  fontWeight: 700,
}))

const Nickname = styled.p(({theme}) => ({
  color: theme.color.gray400,
  fontSize: '1.4rem',
  fontWeight: 500,
}))

const ButtonLabel = styled.p(({theme}) => ({
  color: theme.color.gray900,
  fontWeight: 700,
  fontSize: '1.6rem',
}))
