import {keyframes} from '@emotion/react'
import styled from '@emotion/styled'
import {forwardRef, useRef} from 'react'

import {LazyImage} from '@/components/lazy-image'
import {useScrollAnimationFrame} from '@/providers/scroll-animation-provider'
import {animateElement, ScrollAnimation} from '@/utils/animation'

import {AnimationProps} from '.'

const carImage = '/car.png'

export function SecondStage({offset}: AnimationProps) {
  const carRef = useRef<HTMLDivElement>(null)
  const firstMsgRef = useRef<HTMLDivElement>(null)
  const secondMsgRef = useRef<HTMLDivElement>(null)
  const thirdMsgRef = useRef<HTMLDivElement>(null)

  const carAnimations: ScrollAnimation[] = [
    {type: 'translateY', start: 0, end: 50, startFrame: 0, endFrame: 1000},
    {type: 'translateX', start: 0, end: -18, startFrame: 0, endFrame: 1000},
    {type: 'translateX', start: -18, end: 20, startFrame: 2000, endFrame: 3000},
    {type: 'translateX', start: 20, end: -18, startFrame: 4000, endFrame: 5000},
    {type: 'translateX', start: -18, end: 0, startFrame: 6000, endFrame: 8000},
    {type: 'translateY', start: 50, end: 150, startFrame: 6000, endFrame: 8000},
  ]

  const firstMsgAnimations: ScrollAnimation[] = [
    {type: 'translateX', start: 50, end: -10, startFrame: 0, endFrame: 1000},
    {type: 'translateX', start: -10, end: 50, startFrame: 2000, endFrame: 3000},
    {type: 'scale', start: 1, end: 1.5, startFrame: 0, endFrame: 3000},
  ]

  const secondMsgAnimations: ScrollAnimation[] = [
    {type: 'translateX', start: -50, end: 10, startFrame: 2000, endFrame: 3000},
    {type: 'translateX', start: 10, end: -50, startFrame: 4000, endFrame: 5000},
    {type: 'scale', start: 1, end: 1.5, startFrame: 2000, endFrame: 5000},
  ]

  const thirdMsgAnimations: ScrollAnimation[] = [
    {type: 'translateX', start: 50, end: -10, startFrame: 4000, endFrame: 5000},
    {type: 'translateX', start: -10, end: 50, startFrame: 6000, endFrame: 7000},
    {type: 'scale', start: 1, end: 1.5, startFrame: 4000, endFrame: 7000},
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
      <MessageContainerRight ref={firstMsgRef}>
        <Message>우리동네</Message>
        <Message>인기 운전 연수 강사는?</Message>
      </MessageContainerRight>
      <MessageContainerLeft ref={secondMsgRef}>
        <Message>10만 연수생들의</Message>
        <Message>생생한 연수 후기</Message>
      </MessageContainerLeft>
      <MessageContainerRight ref={thirdMsgRef}>
        <Message>채팅으로 궁금한 건</Message>
        <Message>직접 물어보자!</Message>
      </MessageContainerRight>
    </>
  )
}

const MessageContainer = styled.div({
  position: 'absolute',
  width: '40vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  top: 0,
  gap: '2rem',
  overflow: 'hidden',
})

const MessageContainerLeft = styled(MessageContainer)({
  left: 0,
})

const MessageContainerRight = styled(MessageContainer)({
  right: 0,
})

const Message = styled.div(({theme}) => ({
  textAlign: 'center',
  fontSize: '3vw',
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
  background: 'linear-gradient(48deg, rgba(61,63,71,1) 0%, rgba(92,108,126,1) 100%)',
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

const Image = styled(LazyImage)({
  height: '30vh',
  width: '50vw',
  objectFit: 'contain',
  animation: `${wiggle} 3s ease-in-out infinite`,
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

const CarImg = styled(LazyImage)`
  object-fit: contain;
  rotate: 270deg;
  width: 50rem;
  height: 30rem;
  animation: ${wiggle} 4s ease-in-out infinite;
`
