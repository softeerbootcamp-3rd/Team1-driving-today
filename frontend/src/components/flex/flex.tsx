import styled from '@emotion/styled'
import {CSSProperties} from 'react'

export type FlexProps = Pick<
  CSSProperties,
  'justifyContent' | 'alignItems' | 'flexDirection' | 'flexWrap' | 'flexGrow' | 'gap'
>

export const Flex = styled.div<FlexProps>(
  ({justifyContent, alignItems, flexDirection, flexGrow, flexWrap, gap}) => ({
    display: 'flex',
    justifyContent,
    alignItems,
    flexDirection,
    flexGrow,
    flexWrap,
    gap,
  }),
)
