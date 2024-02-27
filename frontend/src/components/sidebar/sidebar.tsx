/* eslint-disable react-refresh/only-export-components */
import styled from '@emotion/styled'
import type {PropsWithChildren} from 'react'
import {NavLink, type NavLinkProps} from 'react-router-dom'

import {Button, type ButtonProps} from '../button'
import {Flex} from '../flex'
import {Icon, type IconName} from '../icon'

function SidebarRoot({children}: PropsWithChildren) {
  return <Nav>{children}</Nav>
}
const Nav = styled.nav(({theme}) => ({
  display: 'flex',
  padding: '1rem',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  width: '8rem',
  position: 'sticky',
  zIndex: 1,
  left: 0,
  backgroundColor: theme.color.gray200,
}))

function SidebarLinkList({children}: PropsWithChildren) {
  return <Ul>{children}</Ul>
}
const Ul = styled.ul(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
}))

interface SidebarLinkProps extends NavLinkProps {
  icon: IconName
  label: string
}
function SidebarLink({icon, label, ...props}: SidebarLinkProps) {
  return (
    <li>
      <StyledNavLink {...props}>
        {({isActive}) => (
          <>
            <Icon name={icon} color={isActive ? 'primary' : 'gray400'} width="3rem" height="3rem" />
            <Label active={isActive}>{label}</Label>
          </>
        )}
      </StyledNavLink>
    </li>
  )
}
const StyledNavLink = styled(NavLink)(({theme}) => ({
  flex: '0 0 6rem',
  width: '6rem',
  height: '6rem',
  borderRadius: '1.6rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',

  '&.active': {
    backgroundColor: theme.color.gray100,
  },
}))
const Label = styled.p<{active: boolean}>(({theme, active}) => ({
  color: active ? theme.color.primary : theme.color.gray400,
  fontWeight: 700,
  fontSize: '1rem',
}))

function SidebarFooter({children}: PropsWithChildren) {
  return (
    <Flex gap="1rem" flexDirection="column">
      {children}
    </Flex>
  )
}

type SidebarChatButtonProps = Omit<ButtonProps, 'color' | 'bgColor'>
function SidebarChatButton(props: SidebarChatButtonProps) {
  return (
    <ChatButton {...props} bgColor="gray100">
      <Icon name="message" color="primary" width="3.5rem" height="3.5rem" />
    </ChatButton>
  )
}
const ChatButton = styled(Button)(({theme}) => ({
  borderRadius: '1.6rem',
  padding: '1.2rem',
  border: `1px solid ${theme.color.gray400}`,
}))

type SidebarLogoutProps = Omit<ButtonProps, 'color' | 'bgColor'>
function SidebarLogout(props: SidebarLogoutProps) {
  return (
    <LogoutButton {...props} bgColor="gray100" color="gray600">
      로그아웃
    </LogoutButton>
  )
}

const LogoutButton = styled(Button)(({theme}) => ({
  borderRadius: '1.6rem',
  padding: '1.2rem',
  border: `1px solid ${theme.color.gray400}`,
}))

export const Sidebar = {
  Root: SidebarRoot,
  LinkList: SidebarLinkList,
  Link: SidebarLink,
  Footer: SidebarFooter,
  ChatButton: SidebarChatButton,
  LogoutButton: SidebarLogout,
}
