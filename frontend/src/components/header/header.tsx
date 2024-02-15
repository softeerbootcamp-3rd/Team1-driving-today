import styled from '@emotion/styled'
import type {CSSProperties, HTMLAttributes, PropsWithChildren} from 'react'

import {Button, type ButtonProps} from '@/components/button'
import {Icon} from '@/components/icon'

interface HeaderProps extends HTMLAttributes<HTMLElement>, StyledHeaderProps {}
export function Header({children, px = 0, ...props}: PropsWithChildren<HeaderProps>) {
  return (
    <StyledHeader px={px} {...props}>
      {children}
    </StyledHeader>
  )
}
interface StyledHeaderProps {
  px?: CSSProperties['padding']
}
const StyledHeader = styled.header<StyledHeaderProps>(({px, theme}) => ({
  position: 'sticky',
  top: 0,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  height: '8rem',
  flex: '0 0 8rem',
  width: '100%',
  paddingLeft: px,
  paddingRight: px,
  backgroundColor: theme.color.white,
  borderBottom: `1px solid ${theme.color.gray200}`,
}))

type HeaderBackButtonProps = Omit<ButtonProps, 'color' | 'bgColor'>
function HeaderBackButton(props: HeaderBackButtonProps) {
  return (
    <BackButton {...props} bgColor="white">
      <Icon name="arrowBack" color="gray900" width="2.4rem" height="2.4rem" />
      <div>뒤로 가기</div>
    </BackButton>
  )
}
const BackButton = styled(Button)(({theme}) => ({
  display: 'flex',
  color: theme.color.gray900,
  alignItems: 'center',
  justifyContent: 'center',
}))

Header.BackButton = HeaderBackButton
