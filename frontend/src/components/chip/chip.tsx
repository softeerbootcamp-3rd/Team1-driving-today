import styled from '@emotion/styled'
import {HTMLAttributes, PropsWithChildren} from 'react'

interface Props extends ChipContainerProps {
  large?: boolean
}

export function Chip({large, selected, disabled, children, ...props}: PropsWithChildren<Props>) {
  const ChipContainer = large ? LargeChipContainer : SmallChipContainer
  return (
    <ChipContainer selected={selected} disabled={disabled} {...props}>
      {children}
    </ChipContainer>
  )
}

interface ChipContainerProps extends HTMLAttributes<HTMLDivElement> {
  selected?: boolean
  disabled?: boolean
}

const BaseChipContainer = styled.div<ChipContainerProps>(() => ({
  userSelect: 'none',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1rem',
  gap: '1rem',
  borderWidth: '0.1rem',
  borderStyle: 'solid',
  borderRadius: '0.8rem',
  fontWeight: 500,
  fontSize: '1.4rem',
}))

const SmallChipContainer = styled(BaseChipContainer)(({theme, disabled, selected}) => {
  const backgroundColor = !disabled
    ? selected
      ? theme.color.primary
      : theme.color.gray50
    : theme.color.gray200

  const borderColor = !disabled
    ? selected
      ? theme.color.primary
      : theme.color.gray200
    : theme.color.gray200

  const color = !disabled
    ? selected
      ? theme.color.white
      : theme.color.gray600
    : theme.color.gray50

  return {
    backgroundColor,
    borderColor,
    color,
  }
})

const LargeChipContainer = styled(BaseChipContainer)(({theme, disabled, selected}) => {
  const borderColor = !disabled
    ? selected
      ? theme.color.primary
      : theme.color.gray200
    : theme.color.gray200

  const color = !disabled ? theme.color.black : theme.color.gray50

  return {
    borderColor,
    color,
    padding: '1.6rem 2.8rem',
    backgroundColor: theme.color.white,
  }
})
