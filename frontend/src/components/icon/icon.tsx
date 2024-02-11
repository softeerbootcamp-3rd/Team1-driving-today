import {Theme} from '@emotion/react'
import styled from '@emotion/styled'

import * as icons from '../../assets/icons'

export type IconName = keyof typeof icons

interface Props {
  name: IconName
  color: keyof Theme['color']
  width: string
  height: string
}

export const Icon = styled.div<Props>(({name, color, width, height, theme}) => ({
  width,
  height,
  mask: `url(${icons[name]})`,
  maskRepeat: 'no-repeat',
  maskSize: 'contain',
  backgroundColor: theme.color[color],
}))
