import {Theme} from '@emotion/react'
import {HTMLAttributes} from 'react'

import {Icon, IconName} from '../icon/icon'

interface Props extends HTMLAttributes<HTMLDivElement> {
  value: number
  width?: string
  height?: string
  color?: keyof Theme['color']
}

export function Star({
  value,
  width = '1.5rem',
  height = '1.5rem',
  color = 'gray600',
  ...props
}: Props) {
  const icon: IconName = value >= 1 ? 'star' : value > 0 ? 'starHalf' : 'starEmpty'
  return <Icon name={icon} color={color} width={width} height={height} {...props} />
}
