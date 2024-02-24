import styled from '@emotion/styled'
import {Link, Outlet} from 'react-router-dom'

import {Header} from '@/components/header'
import {sessionProvider} from '@/utils/session'

import {Landing} from './components/landing'

export function LandingPage() {
  console.log(sessionProvider)
  return (
    <>
      <Landing />
      <Header
        px="1rem"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          backdropFilter: 'blur(8px)',
          border: 'none',
          background: 'rgba(0,0,0,0)',
        }}
      >
        {sessionProvider.session ? <AuthHeader /> : <UnAuthHeader />}
      </Header>
      <Outlet />
    </>
  )
}

function AuthHeader() {
  return (
    <>
      <Link to="/dashboard">
        <LinkLabel>대시보드</LinkLabel>
      </Link>
    </>
  )
}

function UnAuthHeader() {
  return (
    <>
      <Link to="/login">
        <LinkLabel>로그인</LinkLabel>
      </Link>
      <Link to="/register">
        <LinkLabel>회원가입</LinkLabel>
      </Link>
    </>
  )
}

const LinkLabel = styled.p(({theme}) => ({
  color: theme.color.gray800,
  opacity: 0.3,
  padding: '0 2rem',
  fontSize: '1.8rem',
  fontWeight: 600,
  ':hover': {
    opacity: 1,
    textDecoration: 'line',
  },
  transition: 'opacity 0.5s ease',
}))
