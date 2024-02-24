import styled from '@emotion/styled'
import {useRef, useState} from 'react'

import {
  ScrollAnimationProvider,
  useScrollAnimationFrame,
} from '@/providers/scroll-animation-provider'
import {animateElement} from '@/utils/animation'

import {FirstStage, SecondStage, ThirdStage} from '.'

export function Landing() {
  return (
    <>
      <ScrollAnimationProvider max={18600} start={50} loop>
        <Stages />
      </ScrollAnimationProvider>
    </>
  )
}

function Stages() {
  const [stage, setStage] = useState(0)
  useScrollAnimationFrame('stage manager', (realFrame) => {
    const newStage = getStage(realFrame)
    if (stage !== newStage) setStage(newStage)
  })
  return (
    <>
      {stage === 0 && <FirstStage offset={0} />}
      {(stage === 1 || stage === 2 || stage === 3) && <SecondStage offset={10700} />}
      {(stage === 0 || stage === 1) && <CloudTransition offset={9000} />}
      {(stage === 3 || stage === 4 || stage === 0) && <ThirdStage offset={17500} />}
    </>
  )
}

function getStage(frame: number) {
  if (frame < 10100) return 0
  else if (frame < 11300) return 1
  else if (frame < 17400) return 2
  else if (frame < 18500) return 3
  return 4
}

export interface PositionProps {
  left?: string
  top?: string
  bottom?: string
  right?: string
}

export interface SizeProps {
  width?: string
  height?: string
}

export const GeneralContainer = styled.div<PositionProps & SizeProps>(
  ({left, top, width, height}) => ({
    width: width ?? 'auto',
    height: height ?? 'auto',
    position: 'absolute',
    left: left ?? '0',
    top: top ?? '0',
  }),
)

export interface AnimationProps {
  offset?: number
}

function CloudTransition({offset}: AnimationProps) {
  const transitionRef = useRef<HTMLDivElement>(null)
  useScrollAnimationFrame('stage 1 transition', (realFrame) => {
    const frame = realFrame - (offset ?? 0)
    animateElement(
      frame,
      [{type: 'translateY', start: 0, end: -240, startFrame: 0, endFrame: 2000}],
      [transitionRef.current],
    )
  })
  return <CloudsTransitionBackground ref={transitionRef} />
}

const CloudsTransitionBackground = styled.div`
  position: absolute;
  top: 120vh;
  left: 0;
  width: 100vw;
  height: 120vh;
  background-color: white;
  background: linear-gradient(180deg, rgba(119, 205, 255, 1) 0%, rgba(175, 175, 175, 1) 100%);
  mask: radial-gradient(5.71vh at 50% 7.75vh, #000 99%, #0000 101%) calc(50% - 10vh) 0/20vh 51%
      repeat-x,
    radial-gradient(5.71vh at 50% -2.75vh, #0000 99%, #000 101%) 50% 5vh/20vh calc(51% - 5vh)
      repeat-x,
    radial-gradient(5.71vh at 50% calc(100% - 7.75vh), #000 99%, #0000 101%) calc(50% - 10vh) 100%/20vh
      51% repeat-x,
    radial-gradient(5.71vh at 50% calc(100% + 2.75vh), #0000 99%, #000 101%) 50% calc(100% - 5vh) /
      20vh calc(51% - 5vh) repeat-x;
`
