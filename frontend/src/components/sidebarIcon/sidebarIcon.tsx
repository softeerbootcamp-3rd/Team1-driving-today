import styled from '@emotion/styled'
import {HTMLAttributes} from 'react'

import {Icon, IconName} from '../icon/icon'

interface Props extends ContainerProps, HTMLAttributes<HTMLDivElement> {
  label?: string
  highlight?: boolean
  icon: IconName
}

export function SidebarIcon({label, selected, highlight, icon, ...props}: Props) {
  return (
    <Container selected={selected} {...props}>
      <Icon
        name={icon}
        color={selected || highlight ? 'primary' : 'gray400'}
        width="3rem"
        height="3rem"
      />
      {label && <Label selected={selected}>{label}</Label>}
    </Container>
  )
}

interface ContainerProps {
  selected?: boolean
}

const Container = styled.div<ContainerProps>(({theme, selected}) => ({
  flex: '0 0 6rem',
  width: '6rem',
  height: '6rem',
  borderRadius: '1.6rem',
  backgroundColor: selected ? theme.color.gray100 : 'transparent',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
}))

const Label = styled.p<ContainerProps>(({theme, selected}) => ({
  color: selected ? theme.color.primary : theme.color.gray400,
  fontWeight: 700,
  fontSize: '1rem',
}))
