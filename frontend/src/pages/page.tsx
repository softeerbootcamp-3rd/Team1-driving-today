import {Link, Outlet} from 'react-router-dom'

import {Header} from '@/components/header'

import {Landing} from './components/landing'

export function LandingPage() {
  return (
    <>
      <Landing />
      <Header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          backdropFilter: 'blur(8px)',
          border: 'none',
          background: 'rgba(0,0,0,0)',
        }}
      >
        <Link to="/login">로그인</Link>
        <Link to="/register">회원가입</Link>
      </Header>
      <Outlet />
    </>
  )
}
