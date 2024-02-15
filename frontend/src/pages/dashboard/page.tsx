import styled from '@emotion/styled'

import {Header} from '@/components/header'
import {Logo} from '@/components/logo'

import {Cardlist} from './components/cardlist/cardlist'
import {MyProfileCard} from './components/myprofile-card'
import {ScheduleCard} from './components/schedule-card'

export function StudentDashboard() {
  return (
    <RootLayout>
      <Header>
        <Logo />
      </Header>
      <ContentLayout>
        <ContentContainer>
          <ScheduleCard />
        </ContentContainer>
        <ModalContainer>
          <MyProfileCard />
        </ModalContainer>
      </ContentLayout>
    </RootLayout>
  )
}

export function InstructorDashboard() {
  return (
    <RootLayout>
      <Header>
        <Logo />
      </Header>
      <ContentLayout>
        <ContentContainer>
          <Cardlist />
        </ContentContainer>
        <ModalContainer>
          <MyProfileCard />
        </ModalContainer>
      </ContentLayout>
    </RootLayout>
  )
}

const RootLayout = styled.div({display: 'flex', flexDirection: 'column', flexGrow: 1})
const ContentLayout = styled.div({
  display: 'flex',
  gap: '1rem',
  flexGrow: 1,
  justifyContent: 'center',
  margin: '0 20rem',
  overflowY: 'hidden',
})

const ContentContainer = styled.div({
  display: 'flex',
  flexGrow: 1,
  minWidth: '50rem',
  padding: '1rem',
})

const ModalContainer = styled.div({
  minWidth: '40rem',
  padding: '1rem',
  overflowY: 'auto',
})
