import styled from '@emotion/styled'
import React, {InputHTMLAttributes} from 'react'

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  props,
  forwardedRef,
) {
  return (
    <Container>
      <Input ref={forwardedRef} type="checkbox" {...props} />
      <span aria-hidden="true" />
    </Container>
  )
})

const Container = styled.span(() => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  border: 0,
  outline: 0,
  userSelect: 'none',
  cursor: 'pointer',
  padding: '1rem',
}))

const Input = styled.input(({theme}) => ({
  position: 'absolute',
  inset: 0,
  opacity: 0,
  cursor: 'inherit',
  zIndex: 1,
  '& + span': {
    position: 'relative',
    display: 'inline-block',
    border: `2px solid ${theme.color.gray700}`,
    width: '1.8rem',
    height: '1.8rem',
    borderRadius: '0.3rem',
  },

  '&:checked + span': {
    border: 0,
  },

  '&:checked + span::after': {
    content: '"✓"',
    color: `${theme.color.white}`,
    position: 'absolute',
    fontSize: '1.5rem',
    lineHeight: '1.5rem',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    verticalAlign: 'middle',
    backgroundColor: `${theme.color.primary}`,
    borderRadius: '0.3rem',
  },

  '&:checked:disabled + span': {
    border: 0,
  },

  '&:disabled + span': {
    border: `2px solid ${theme.color.gray400}`,
  },

  '&:checked:disabled + span::after': {
    backgroundColor: `${theme.color.gray400}`,
  },
}))
