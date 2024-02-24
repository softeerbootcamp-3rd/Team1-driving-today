import styled from '@emotion/styled'
import {Link, Outlet, useLoaderData} from 'react-router-dom'

import {Flex} from '@/components/flex'
import {Sidebar} from '@/components/sidebar'
import {Typography} from '@/components/typography'
import {useChatModal} from '@/providers'

import {UserRole} from '../utils/session'
import {ChatModalContainer} from './components'

function LayoutRoot() {
  const role = useLoaderData() as UserRole

  return (
    <LayoutContainer>
      {role === 'STUDENT' ? <StudentSidebar /> : <InstructorSidebar />}
      <ChatModalContainer />
      <Outlet />
    </LayoutContainer>
  )
}
const LayoutContainer = styled.main(() => ({
  display: 'flex',
  height: '100%',
  width: '100%',
}))

function LayoutErrorBoundary() {
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap="2rem"
      style={{width: '100%', height: '100%'}}
    >
      <Typography size="1.4rem" weight="normal" color="gray900">
        알 수 없는 에러입니다.
      </Typography>
      <BackHomeButton to="/" replace>
        홈으로 돌아가기
      </BackHomeButton>
      <img src="/error.png" width="200" height="200" />
    </Flex>
  )
}

const BackHomeButton = styled(Link)(({theme}) => ({
  display: 'inline-block',
  border: `2px solid ${theme.color.gray900}`,
  color: '#fff',
  textTransform: 'uppercase',
  fontWeight: 600,
  padding: '0.75rem 1rem 0.6rem',
  transition: 'all 0.2s linear',
  boxShadow: '0 15px 15px -11px rgba(0,0,0, 0.4)',
  background: theme.color.gray900,
  borderRadius: '6px',
  fontSize: '1.6rem',
  width: 'fit-content',
  marginTop: '2rem',

  '&:hover': {
    background: theme.color.gray900,
    color: theme.color.gray300,
    transform: 'scale(1.1)',
  },
}))

export const Layout = Object.assign(LayoutRoot, {
  ErrorBoundary: LayoutErrorBoundary,
})

function StudentSidebar() {
  const {handleOpen} = useChatModal()
  return (
    <Sidebar.Root>
      <Sidebar.LinkList>
        <Sidebar.Link icon="home" to="/dashboard" label="홈" />
        <Sidebar.Link icon="history" to="/history" label="예약 내역" />
        <Sidebar.Link icon="makeReservation" to="/reservation" label="연수 예약" />
      </Sidebar.LinkList>
      <Sidebar.Footer>
        <Sidebar.ChatButton onClick={() => handleOpen({content: 'HOME'})} />
      </Sidebar.Footer>
    </Sidebar.Root>
  )
}

function InstructorSidebar() {
  const {handleOpen} = useChatModal()
  return (
    <Sidebar.Root>
      <Sidebar.LinkList>
        <Sidebar.Link icon="home" to="/dashboard" label="홈" />
        <Sidebar.Link icon="history" to="/history" label="지난 연수" />
      </Sidebar.LinkList>
      <Sidebar.Footer>
        <Sidebar.ChatButton onClick={() => handleOpen({content: 'HOME'})} />
      </Sidebar.Footer>
    </Sidebar.Root>
  )
}
