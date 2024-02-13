import {Theme} from '@emotion/react'
import styled from '@emotion/styled'
import {HTMLAttributes, useState} from 'react'

import {Icon, IconName} from '../icon/icon'

interface RatingProps extends HTMLAttributes<HTMLDivElement>, ContainerProps {
  defaultValue?: number
  onValueChange?: (value: number) => void
}

const indices = Array.from({length: 5}, (_, i) => i)

export function Rating({defaultValue = 0, readOnly, onValueChange, ...props}: RatingProps) {
  const [realValue, setRealValue] = useState(defaultValue)
  const [previewValue, setPreivewValue] = useState<number | null>(null)
  const showValue = previewValue ?? realValue

  return (
    <Container
      onPointerLeave={() => setPreivewValue(null)}
      onClick={() => {
        const newValue = previewValue ?? defaultValue
        onValueChange?.(newValue)
        setRealValue(newValue)
      }}
      readOnly={readOnly}
      {...props}
    >
      <Label>{realValue}</Label>
      {indices.map((v) => (
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

interface StarProps extends HTMLAttributes<HTMLDivElement> {
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
}: StarProps) {
  const icon: IconName = value >= 1 ? 'star' : value > 0 ? 'starHalf' : 'starEmpty'
  return <Icon name={icon} color={color} width={width} height={height} {...props} />
}
