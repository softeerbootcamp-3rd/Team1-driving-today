import type {Theme} from '@emotion/react'
import styled from '@emotion/styled'
import {ButtonHTMLAttributes, PropsWithChildren} from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * text color
   * @default 'gray50'
   */
  color?: keyof Theme['color']
  /**
   * button background color
   * @default 'primary'
   */
  bgColor?: keyof Theme['color']
}

export function ButtonBase({
  children,
  color = 'gray50',
  bgColor = 'primary',
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <Button {...props} color={color} bgColor={bgColor}>
      {children}
    </Button>
  )
}

const Button = styled.button<{color: keyof Theme['color']; bgColor: keyof Theme['color']}>`
  background-color: ${({theme, bgColor}) => theme.color[bgColor]};
  color: ${({theme, color}) => theme.color[color]};
  padding: 0.8rem;
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1.7rem;
  text-align: center;
  border-radius: 0.8rem;
  cursor: pointer;
  width: 100%;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`
