import styled from '@emotion/styled'
import {useRef} from 'react'

import {logoHead} from '@/assets/icons'
import {useScrollAnimationFrame} from '@/providers/scroll-animation-provider'
import {animateElement, ScrollAnimation} from '@/utils/animation'

interface AnimatedWheelProps {
  id: string
  position: [string, string]
}

// example animated component
export function SampleWheel({id, position}: AnimatedWheelProps) {
  const wheelRef = useRef<HTMLDivElement>(null)
  const divRef = useRef<HTMLDivElement>(null)

  useScrollAnimationFrame(id, (frame) => {
    animateElement(frame, [scale, rotate], [wheelRef.current])
    animateElement(frame, [translateX, translateY], [divRef.current])
  })
  return (
    <WheelContainer ref={divRef} style={{left: position[0], top: position[1]}}>
      <Wheel ref={wheelRef} />
    </WheelContainer>
  )
}

const WheelContainer = styled.div({
  position: 'absolute',
  transition: 'all 0.5s ease',
})

const Wheel = styled.div(({theme}) => ({
  width: '10rem',
  height: '10rem',
  mask: `url(${logoHead})`,
  maskRepeat: 'no-repeat',
  maskSize: 'contain',
  backgroundColor: theme.color.primary,
  transition: 'all 0.5s ease',
}))

const rotate: ScrollAnimation = {
  start: 0,
  end: 9000,
  startFrame: 100,
  endFrame: 50000,
  type: 'rotate',
}

const translateX: ScrollAnimation = {
  start: 0,
  end: 50,
  startFrame: 100,
  endFrame: 2000,
  type: 'translateX',
}
const translateY: ScrollAnimation = {
  start: 0,
  end: 50,
  startFrame: 100,
  endFrame: 2000,
  type: 'translateY',
}
const scale: ScrollAnimation = {
  start: 1,
  end: 5,
  startFrame: 100,
  endFrame: 2000,
  type: 'scale',
}
