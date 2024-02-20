import styled from '@emotion/styled'
import {useState} from 'react'

import {Header} from '@/components/header'
import {Logo} from '@/components/logo'
import {InstructorReservation, StudentReservation} from '@/types/reservation'

import {InstructorCardlist, StudentCardlist} from '../history/components/cardlist'
import {ReviewModal, StudentModal} from './components/modal'

const RootLayout = styled.div({display: 'flex', flexDirection: 'column', flexGrow: 1})
const ContentLayout = styled.div({
  display: 'flex',
  gap: '1rem',
  flexGrow: 1,
  justifyContent: 'center',
  margin: '0 20rem',
  overflowY: 'hidden',
})

const ListContainer = styled.div({display: 'flex', flexGrow: 1, minWidth: '50rem'})

const ModalContainer = styled.div({
  minWidth: '40rem',
  padding: '1rem',
  overflow: 'auto',
})

export function StudentHistory() {
  const [selected, setSelected] = useState<InstructorReservation>()

  return (
    <RootLayout>
      <Header px="20rem">
        <Logo />
      </Header>
      <ContentLayout>
        <ListContainer>
          <StudentCardlist onReviewClick={setSelected} selected={selected} />
        </ListContainer>
        <ModalContainer>
          {selected && (
            <ReviewModal
              key={selected?.reservationId}
              onClose={() => setSelected(undefined)}
              reservationId={selected?.reservationId}
              instructorId={selected?.instructorId}
            />
          )}
        </ModalContainer>
      </ContentLayout>
    </RootLayout>
  )
}

export function InstructorHistory() {
  const [selected, setSelected] = useState<StudentReservation>()
  return (
    <RootLayout>
      <Header px="20rem">
        <Logo />
      </Header>
      <ContentLayout>
        <ListContainer>
          <InstructorCardlist onSelect={setSelected} selected={selected} />
        </ListContainer>
        <ModalContainer>
          {selected && (
            <StudentModal onClose={() => setSelected(undefined)} studentId={selected.studentId} />
          )}
        </ModalContainer>
      </ContentLayout>
    </RootLayout>
  )
}
