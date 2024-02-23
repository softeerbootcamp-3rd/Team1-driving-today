import {useRef} from 'react'

import {useScrollAnimationFrame} from '@/providers/scroll-animation-provider'
import {animateElement, ScrollAnimation} from '@/utils/animation'

import {AnimationProps, GeneralContainer} from '.'
import {LogoImg, WheelImg} from './first-stage'

export function ThirdStage({offset}: AnimationProps) {
  const backgroundRef = useRef<HTMLDivElement>(null)

  const backgroundAnimations: ScrollAnimation[] = [
    {type: 'translateY', start: 0, end: 100, startFrame: 0, endFrame: 1000},
  ]

  useScrollAnimationFrame('third stage', (realFrame) => {
    const frame = realFrame - (offset ?? 0)
    animateElement(frame, backgroundAnimations, [backgroundRef.current])
  })

  return (
    <GeneralContainer
      ref={backgroundRef}
      style={{backgroundColor: 'white'}}
      width="100vw"
      height="100vh"
      top="-100vh"
    >
      <LogoImg />
      <WheelImg />
    </GeneralContainer>
  )
}
