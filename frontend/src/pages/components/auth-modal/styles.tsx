import styled from '@emotion/styled'

import {Flex} from '@/components/flex'

export const ModalContainer = styled(Flex)(() => ({
  position: 'fixed',
  inset: 0,
}))

export const Modal = styled(Flex)(({theme}) => ({
  zIndex: 1000,
  backgroundColor: theme.color.white,
  padding: '2rem',
  borderRadius: '1.6rem',
  width: '100%',
  maxWidth: '45rem',
  maxHeight: '85%',
  overflowY: 'auto',
  margin: 'auto',
  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
}))

export const Dimmed = styled.div(() => ({
  position: 'fixed',
  background: 'rgb(0, 0, 0, 20%)',
  inset: 0,
}))

export const Input = styled.input(({theme}) => ({
  border: `1px solid ${theme.color.gray300}`,
  borderRadius: '1rem',
  fontSize: '1.6rem',
  padding: '1rem 1.6rem',
  width: '100%',

  ':invalid': {
    border: `1px solid ${theme.color.warning}`,
  },
  ':placeholder-shown': {
    border: `1px solid ${theme.color.gray300}`,
  },
}))

export const ErrorMessage = styled.p(({theme}) => ({
  fontSize: '1.6rem',
  color: theme.color.warning,
}))

export const CloseButton = styled.button(({theme}) => ({
  borderRadius: '50%',
  backgroundColor: theme.color.gray100,
  padding: '1rem',
  cursor: 'pointer',
  transition: 'all 0.3s',
  '&:hover': {
    backgroundColor: theme.color.gray200,
  },
  '&:active': {
    backgroundColor: theme.color.gray300,
  },
}))

export const PrevButton = styled.button(() => ({
  fontSize: '1.2rem',
  textDecoration: 'underline',
}))

export const TextArea = styled.textarea(({theme}) => ({
  borderRadius: '1.6rem',
  backgroundColor: theme.color.gray200,
  padding: '1rem',
  width: '100%',
  fontSize: '1.4rem',
  ':invalid': {
    border: `1px solid ${theme.color.warning}`,
  },
  ':placeholder-shown': {
    border: `1px solid ${theme.color.gray300}`,
  },
}))
