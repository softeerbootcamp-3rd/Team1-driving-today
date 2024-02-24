import styled from '@emotion/styled'

import {Icon} from '@/components/icon'
import {Typography} from '@/components/typography'

import {InstructorDetail} from './instructor-detail'

interface DetailDialogProps {
  id: number
  onClose: () => void
}
export function DetailDialog({id, onClose}: DetailDialogProps) {
  return (
    <Dialog>
      <DialogHeader>
        <Typography as="h1" color="gray900" size="2rem" weight="bold">
          강사 상세 정보
        </Typography>
        <Icon
          name="close"
          width="1.4rem"
          height="1.4rem"
          color="gray900"
          onClick={onClose}
          style={{cursor: 'pointer'}}
        >
          닫기
        </Icon>
      </DialogHeader>
      <DialogContent>
        <InstructorDetail key={id} id={id} />
      </DialogContent>
    </Dialog>
  )
}

const Dialog = styled.div(() => ({
  position: 'absolute',
  left: '105%',
  top: '2rem',
  width: '35rem',
  height: '90%',
  backgroundColor: 'white',
  borderRadius: '1.6rem',
  boxShadow: '5px 5px 5px 0px rgb(0 0 0 / 15%)',
  display: 'flex',
  flexDirection: 'column',
  '@media (max-width: 1248px)': {
    width: '100%',
    left: 0,
    height: '100%',
    borderRadius: '0',
  },
}))

const DialogHeader = styled.div(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '2rem',
}))

const DialogContent = styled.div(() => ({
  padding: '0 2rem 0',
  height: '100%',
  flex: '1 1 0',
  overflowY: 'scroll',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
}))
