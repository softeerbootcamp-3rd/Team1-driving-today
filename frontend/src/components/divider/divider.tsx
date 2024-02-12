import {Theme, useTheme} from '@emotion/react'
import styled from '@emotion/styled'
import {HTMLAttributes} from 'react'

interface Props extends HTMLAttributes<HTMLHRElement>, HrProps {
  color?: keyof Theme['color']
}

export function Divider({
  rounded = false,
  color = 'gray300',
  orientation = 'horizontal',
  flexItem = false,
  ...props
}: Props) {
  const theme = useTheme()
  return (
    <Hr
      rounded={rounded}
      color={theme.color[color]}
      orientation={orientation}
      flexItem={flexItem}
      {...props}
    />
  )
}

interface HrProps {
  rounded?: boolean
  orientation?: 'vertical' | 'horizontal'
  flexItem?: boolean
}

const Hr = styled.hr<HrProps>`
  text-align: center;
  flex-shrink: 0;
  align-self: stretch;
  width: ${({orientation}) => (orientation === 'horizontal' ? '100%' : '0.1rem')};
  height: ${({orientation, flexItem}) =>
    orientation === 'horizontal' ? '0.1rem' : flexItem ? 'auto' : '100%'};
  border-radius: ${({rounded}) => rounded && '50%'};
`
