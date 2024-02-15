import styled from '@emotion/styled'
import {Outlet, useLoaderData} from 'react-router-dom'

import {Sidebar} from '@/components/sidebar'

export function Layout() {
  const {isStudent} = useLoaderData()

  return (
    <LayoutContainer>
      {isStudent ? <StudentSidebar /> : <InstructorSidebar />}
      <Outlet />
    </LayoutContainer>
  )
}
const LayoutContainer = styled.main(() => ({
  display: 'flex',
  height: '100%',
  width: '100%',
}))

function StudentSidebar() {
  return (
    <Sidebar.Root>
      <Sidebar.LinkList>
        <Sidebar.Link icon="home" to="/dashboard" label="홈" />
        <Sidebar.Link icon="history" to="/history" label="예약 내역" />
        <Sidebar.Link icon="makeReservation" to="/schedule" label="연수 예약" />
      </Sidebar.LinkList>
      <Sidebar.Footer>
        <Sidebar.ChatButton />
      </Sidebar.Footer>
    </Sidebar.Root>
  )
}

function InstructorSidebar() {
  return (
    <Sidebar.Root>
      <Sidebar.LinkList>
        <Sidebar.Link icon="home" to="/dashboard" label="홈" />
        <Sidebar.Link icon="history" to="/history" label="지난 연수" />
      </Sidebar.LinkList>
      <Sidebar.Footer>
        <Sidebar.ChatButton />
      </Sidebar.Footer>
    </Sidebar.Root>
  )
}
