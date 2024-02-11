import styled from '@emotion/styled'
import {HTMLAttributes, useState} from 'react'

import {Star} from '../star'

interface Props extends HTMLAttributes<HTMLDivElement>, ContainerProps {
  defaultValue?: number
  onValueChange?: (value: number) => void
}

export function Rating({defaultValue = 0, readOnly, onValueChange, ...props}: Props) {
  const [realValue, setRealValue] = useState(defaultValue)
  const [previewValue, setPreivewValue] = useState<number | undefined>(undefined)
  const showValue = previewValue ?? realValue

  return (
    <Container
      onPointerLeave={() => setPreivewValue(undefined)}
      onClick={() => {
        const newValue = previewValue ?? defaultValue
        onValueChange?.(newValue)
        setRealValue(newValue)
      }}
      readOnly={readOnly}
      {...props}
    >
      <Label>{realValue}</Label>
      {indexes.map((v) => (
        <Star
          key={`star-${v}`}
          value={showValue - v}
          onPointerEnter={() => setPreivewValue(v + 1)}
          onPointerMove={(e) => {
            const {width, x} = (e.target as HTMLDivElement).getBoundingClientRect()
            const percentage = (e.clientX - x) / width
            if (percentage > 0.5) setPreivewValue(v + 1)
            else if (percentage < 0.1) setPreivewValue(v)
            else setPreivewValue(v + 0.5)
          }}
        />
      ))}
    </Container>
  )
}

interface ContainerProps {
  readOnly?: boolean
}

const Container = styled.div<ContainerProps>(({readOnly}) => ({
  userSelect: 'none',
  pointerEvents: readOnly ? 'none' : 'auto',
  display: 'flex',
  gap: '0.1rem',
  alignItems: 'center',
}))

const Label = styled.p(({theme}) => ({
  width: '2.5rem',
  textAlign: 'center',
  fontWeight: 400,
  fontSize: '1.4rem',
  color: theme.color.gray600,
  lineHeight: '1.7rem',
}))

const indexes = Array(5)
  .fill(null)
  .map((_, i) => i)
