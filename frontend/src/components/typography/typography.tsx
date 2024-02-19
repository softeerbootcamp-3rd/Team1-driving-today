import {Theme} from '@emotion/react'
import styled from '@emotion/styled'
import {CSSProperties} from 'react'

export interface TypographyProps {
  color: keyof Theme['color']
  size: CSSProperties['fontSize']
  weight: CSSProperties['fontWeight']
}

export const Typography = styled.span<TypographyProps>(({theme, color, size, weight}) => ({
  color: theme.color[color],
  fontSize: size,
  fontWeight: weight,
}))
