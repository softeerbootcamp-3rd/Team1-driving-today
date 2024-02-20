import {Link, Outlet} from 'react-router-dom'

import {Header} from '@/components/header'

export function LandingPage() {
  return (
    <>
      <Header>
        <Link to="/login">로그인</Link>
        <Link to="/register">회원가입</Link>
      </Header>
      <Outlet />
    </>
  )
}
