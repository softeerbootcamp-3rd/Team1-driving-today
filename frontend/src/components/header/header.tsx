import styled from '@emotion/styled'
import type {CSSProperties, HTMLAttributes, PropsWithChildren} from 'react'

import {Button} from '../button'

interface HeaderProps extends HTMLAttributes<HTMLElement>, StyledHeaderProps {}
export function Header({children, ...props}: PropsWithChildren<HeaderProps>) {
  return <StyledHeader {...props}>{children}</StyledHeader>
}

function HeaderBackButton() {
  return <Button bgColor="white">back</Button>
}

type HeaderBoxProps = HTMLAttributes<HTMLDivElement>
function HeaderBox({children, ...props}: PropsWithChildren<HeaderBoxProps>) {
  return <div {...props}>{children}</div>
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
  width: '100%',
  paddingLeft: px,
  paddingRight: px,
  backgroundColor: theme.color.white,
  borderBottom: `1px solid ${theme.color.gray200}`,
}))

Header.BackButton = HeaderBackButton
Header.Box = HeaderBox
