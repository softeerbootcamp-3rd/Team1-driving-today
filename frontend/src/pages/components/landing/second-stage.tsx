import {keyframes} from '@emotion/react'
import styled from '@emotion/styled'
import {forwardRef, useRef} from 'react'

import carImage from '@/assets/car.png'
import {useScrollAnimationFrame} from '@/providers/scroll-animation-provider'
import {animateElement, ScrollAnimation} from '@/utils/animation'

import {AnimationProps, GeneralContainer} from '.'

export function SecondStage({offset}: AnimationProps) {
  const carRef = useRef<HTMLDivElement>(null)
  const firstMsgRef = useRef<HTMLDivElement>(null)
  const secondMsgRef = useRef<HTMLDivElement>(null)
  const thirdMsgRef = useRef<HTMLDivElement>(null)

  const carAnimations: ScrollAnimation[] = [
    {type: 'translateY', start: 0, end: 50, startFrame: 0, endFrame: 1000},
    {type: 'translateX', start: 0, end: -18, startFrame: 0, endFrame: 1000},
    {type: 'translateX', start: -15, end: 20, startFrame: 2000, endFrame: 3000},
    {type: 'translateX', start: 20, end: -18, startFrame: 4000, endFrame: 5000},
    {type: 'translateX', start: -18, end: 0, startFrame: 6000, endFrame: 8000},
    {type: 'translateY', start: 50, end: 150, startFrame: 6000, endFrame: 8000},
  ]

  const firstMsgAnimations: ScrollAnimation[] = [
    {type: 'translateX', start: 0, end: -70, startFrame: 0, endFrame: 1000},
    {type: 'translateX', start: -70, end: 0, startFrame: 2000, endFrame: 3000},
  ]

  const secondMsgAnimations: ScrollAnimation[] = [
    {type: 'translateX', start: 0, end: 70, startFrame: 2000, endFrame: 3000},
    {type: 'translateX', start: 70, end: 0, startFrame: 4000, endFrame: 5000},
  ]

  const thirdMsgAnimations: ScrollAnimation[] = [
    {type: 'translateX', start: 0, end: -70, startFrame: 4000, endFrame: 5000},
    {type: 'translateX', start: -70, end: 0, startFrame: 6000, endFrame: 7000},
  ]

  useScrollAnimationFrame('second stage', (realFrame) => {
    const frame = realFrame - (offset ?? 0)

    animateElement(frame, carAnimations, [carRef.current])
    animateElement(frame, firstMsgAnimations, [firstMsgRef.current])
    animateElement(frame, secondMsgAnimations, [secondMsgRef.current])
    animateElement(frame, thirdMsgAnimations, [thirdMsgRef.current])
  })

  return (
    <>
      <Background />
      <RainBackground />
      <Car ref={carRef} />
      <GeneralContainer ref={firstMsgRef} left="120vw" top="30vh" width="30vw">
        <Message>진짜진짜 유용한</Message>
        <Message>서비스</Message>
      </GeneralContainer>
      <GeneralContainer ref={secondMsgRef} left="-50vw" top="30vh" width="30vw">
        <Message>진짜진짜 유용한</Message>
        <Message>서비스</Message>
      </GeneralContainer>
      <GeneralContainer ref={thirdMsgRef} left="120vw" top="30vh" width="30vw">
        <Message>진짜진짜 유용한</Message>
        <Message>서비스</Message>
      </GeneralContainer>
    </>
  )
}

const Message = styled.div(({theme}) => ({
  textAlign: 'center',
  fontSize: '7vh',
  width: '100%',
  fontWeight: '600',
  height: 'auto',
  color: theme.color.gray100,
  animation: `${wiggle} 3s ease-in-out infinite`,
}))

const Car = forwardRef<HTMLDivElement>(function Car(_, ref) {
  return (
    <CarImgContainer ref={ref}>
      <CarImg src={carImage} />
    </CarImgContainer>
  )
})

const Background = styled.div({
  width: '100%',
  height: '100%',
  backgroundColor: 'gray',
})

const wiggle = keyframes`
  0% { transform: translateY(0) }
 50% { transform: translateY(20px)}
 100% { transform: translateY(0) }
`

const CarImgContainer = styled.div({
  position: 'absolute',
  left: '33vw',
  top: '-20vh',
})

function RainBackground() {
  return (
    <RainContainer>
      <Rain time={0.5} />
      <Rain time={1.2} />
      <Rain time={1.1} />
      <Rain time={0.7} />
      <Rain time={0.7} />
      <Rain time={1} />
      <Rain time={1.2} />
      <Rain time={1.1} />
      <Rain time={1.2} />
      <Rain time={1.1} />
      <Rain time={0.8} />
    </RainContainer>
  )
}

const RainContainer = styled.div({
  display: 'flex',
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100vw',
  height: '100vh',
  justifyContent: 'space-evenly',
})

const rainDrop = keyframes`
  0% {
    opacity: 1;
    transform: translateY(100vh);
  }
  65% {
    opacity: 1;
  }
  75% {
    opacity: 0;
    transform: translateY(-100vh);
  }
  100% {
    opacity: 0;
    transform: translateY(-100vh);
  }
`

interface TimeProps {
  time: number
}

const Rain = styled.div<TimeProps>`
  width: 2rem;
  height: 100%;
  background: linear-gradient(to top, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.25));
  animation: ${(props) => props.time}s infinite linear ${rainDrop};
`

const CarImg = styled.img`
  object-fit: contain;
  rotate: 270deg;
  width: 50rem;
  height: 30rem;
  animation: ${wiggle} 4s ease-in-out infinite;
`
