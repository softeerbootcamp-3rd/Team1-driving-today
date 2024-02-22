import styled from '@emotion/styled'
import {Outlet, useLoaderData} from 'react-router-dom'

import {Sidebar} from '@/components/sidebar'
import {useChatModal} from '@/providers'

import {UserRole} from '../utils/session'
import {ChatModalContainer} from './components'

export function Layout() {
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

function StudentSidebar() {
  const {handleOpen} = useChatModal()
  return (
    <Sidebar.Root>
      <Sidebar.LinkList>
        <Sidebar.Link icon="home" to="/dashboard" label="홈" />
        <Sidebar.Link icon="history" to="/history" label="예약 내역" />
        <Sidebar.Link icon="makeReservation" to="/schedule" label="연수 예약" />
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
