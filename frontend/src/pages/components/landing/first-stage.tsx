import {keyframes} from '@emotion/react'
import styled from '@emotion/styled'
import {useRef} from 'react'

import {logoHead, logoRest} from '@/assets/icons'
import {useScrollAnimationFrame} from '@/providers/scroll-animation-provider'
import {animateElement, ScrollAnimation} from '@/utils/animation'

import {AnimationProps, GeneralContainer, PositionProps} from '.'

export function FirstStage({offset}: AnimationProps) {
  return (
    <>
      <Dashboard offset={offset} />
      <Logo offset={offset} />
    </>
  )
}

function Logo({offset}: AnimationProps) {
  const wheelRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  const wheelAnimations: ScrollAnimation[] = [
    {type: 'translateX', startFrame: 0, endFrame: 3000, start: 0, end: -15},
    {type: 'translateY', startFrame: 0, endFrame: 3000, start: 0, end: 40},
    {type: 'scale', startFrame: 0, endFrame: 3000, start: 1, end: 3},
  ]

  const logoAnimations: ScrollAnimation[] = [
    {type: 'translateX', startFrame: 0, endFrame: 2000, start: 0, end: 100},
    {type: 'scale', startFrame: 0, endFrame: 1000, start: 1, end: 0.8},
  ]

  useScrollAnimationFrame('stage 1 logo', (realFrame) => {
    const frame = realFrame - (offset ?? 0)
    animateElement(frame, wheelAnimations, [wheelRef.current])
    animateElement(frame, logoAnimations, [logoRef.current])
  })

  return (
    <>
      <WheelImg ref={wheelRef} />
      <LogoImg ref={logoRef} />
    </>
  )
}

function Dashboard({offset}: AnimationProps) {
  const dashboardRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const skyRef = useRef<HTMLDivElement>(null)
  const firstCloudsRef = useRef<HTMLDivElement[]>([])
  const secondCloudsRef = useRef<HTMLDivElement[]>([])
  const landScapeRef = useRef<HTMLDivElement>(null)
  const firstMessageRef = useRef<HTMLDivElement>(null)

  const dashboardAnimations: ScrollAnimation[] = [
    {type: 'translateY', start: 0, end: -10, startFrame: 3000, endFrame: 5000},
  ]

  const backgroundAnimations: ScrollAnimation[] = [
    {type: 'translateY', start: 0, end: -100, startFrame: 2000, endFrame: 4000},
  ]

  const skyAnimations: ScrollAnimation[] = [
    {type: 'translateY', start: 0, end: -90, startFrame: 4000, endFrame: 6000},
  ]

  const firstCloudsAnimations: ScrollAnimation[] = [
    {type: 'translateY', start: 0, end: -100, startFrame: 5000, endFrame: 7500},
  ]
  const secondCloudsAnimations: ScrollAnimation[] = [
    {type: 'translateY', start: 0, end: -100, startFrame: 6000, endFrame: 7500},
  ]

  const landscapeAnimations: ScrollAnimation[] = [
    {type: 'translateY', start: 0, end: -100, startFrame: 5000, endFrame: 7500},
  ]

  const firstMessageAnimations: ScrollAnimation[] = [
    {type: 'translateY', start: 0, end: -100, startFrame: 7000, endFrame: 9000},
    {type: 'scale', start: 1, end: 1.5, startFrame: 8000, endFrame: 10000},
  ]

  useScrollAnimationFrame('stage 1 dashboard', (realFrame) => {
    const frame = realFrame - (offset ?? 0)
    animateElement(frame, dashboardAnimations, [dashboardRef.current])
    animateElement(frame, backgroundAnimations, [backgroundRef.current])
    animateElement(frame, skyAnimations, [skyRef.current])
    animateElement(frame, firstCloudsAnimations, firstCloudsRef.current)
    animateElement(frame, secondCloudsAnimations, secondCloudsRef.current)
    animateElement(frame, landscapeAnimations, [landScapeRef.current])
    animateElement(frame, firstMessageAnimations, [firstMessageRef.current])
  })
  const firstClouds = [
    [10, 123],
    [40, 118],
    [80, 159],
  ]
  const secondClouds = [
    [-5, 158],
    [70, 120],
  ]

  return (
    <>
      <BackgroundDiv ref={backgroundRef} />
      <SkyDiv ref={skyRef} />
      <Landscape ref={landScapeRef} />
      {firstClouds.map((v, i) => {
        return (
          <GeneralContainer
            key={i}
            ref={(element) => {
              if (!element) return
              firstCloudsRef.current.push(element)
            }}
            left={`${v[0]}vw`}
            top={`${v[1]}vh`}
          >
            <WiggleCloud duration={i + 7} />
          </GeneralContainer>
        )
      })}
      <GeneralContainer ref={firstMessageRef} top="130vh" left="28vw">
        <Message>모두를 위한</Message>
        <Message>운전 연수 플랫폼</Message>
      </GeneralContainer>
      {secondClouds.map((v, i) => {
        return (
          <GeneralContainer
            key={'2nd' + i}
            ref={(element) => {
              if (!element) return
              secondCloudsRef.current.push(element)
            }}
            left={`${v[0]}vw`}
            top={`${v[1]}vh`}
          >
            <WiggleCloud duration={i + 7} />
          </GeneralContainer>
        )
      })}
      <DashBoardDiv ref={dashboardRef} />
    </>
  )
}

const Message = styled.div(({theme}) => ({
  fontSize: '7vw',
  width: '100%',
  textAlign: 'center',
  fontWeight: '700',
  height: 'auto',
  color: theme.color.gray600,
}))

const wiggle = keyframes`
  0%{
    transform: translateX(0);
  }
  50%{
    transform:translateX(20%);
  }
`

const SkyDiv = styled.div({
  borderRadius: '4rem 4rem 0 0',
  backgroundColor: '#d8f7ff',
  width: '90vw',
  margin: '0 5vw',
  height: '100vh',
  position: 'absolute',
  top: '100vh',
  boxShadow: '10px 10px rgba(0,0,0,0.2)',
})

const roadAnimation = keyframes`
  0%{
    background-position: 0 0px;
  }
  100%{
    background-position: 0 40vh;
  }
`

const Landscape = styled.div({
  position: 'absolute',
  backgroundColor: '#3d3f47',
  borderRadius: '50% 50% 0 0',
  width: '80vw',
  height: '40vh',
  left: '10vw',
  top: '172vh',
  ':before': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    width: '2rem',
    height: '100%',
    background: 'linear-gradient(#fff 0%,#fff 60%,#3d3f47 60%, #3d3f47 100%)',
    backgroundSize: '5px',
    animation: `${roadAnimation} 1s linear infinite`,
  },
})

const Cloud = styled.div<PositionProps>(({left, top, theme}) => ({
  left: left ?? 0,
  top: top ?? 0,
  position: 'absolute',
  background: 'rgba(255, 255, 255)',
  width: '30rem',
  height: '10rem',
  borderRadius: '15rem',
  boxShadow: `10px 10px ${theme.color.gray300}`,
  ':after': {
    content: '""',
    background: 'rgba(255, 255, 255)',
    position: 'absolute',
    width: '10rem',
    height: '10rem',
    borderRadius: '50%',
    top: '-5rem',
    left: '5rem',
  },
  ':before': {
    content: '""',
    background: 'rgba(255, 255, 255)',
    position: 'absolute',
    width: '17rem',
    height: '15rem',
    borderRadius: '50%',
    top: '-9rem',
    right: '4rem',
  },
}))

interface WiggleProps {
  duration?: number
}

const WiggleCloud = styled(Cloud)<WiggleProps>(({duration}) => ({
  animation: `ease ${duration ?? 4}s infinite ${wiggle}`,
}))

const DashBoardDiv = styled.div({
  borderRadius: '10rem 10rem 0 0 ',
  backgroundColor: '#08305f',
  width: '100vw',
  height: '20vh',
  position: 'absolute',
  top: '100vh',
})

const BackgroundDiv = styled.div({
  backgroundColor: '#052447',
  width: '100vw',
  height: '100vh',
  position: 'absolute',
  top: '100vh',
})

export const WheelImg = styled.div(({theme}) => ({
  position: 'absolute',
  left: 'calc(50vw - 18rem)',
  top: 'calc(50vh - 8rem)',
  width: '15rem',
  height: '15rem',
  mask: `url(${logoHead})`,
  maskRepeat: 'no-repeat',
  maskSize: 'contain',
  backgroundColor: theme.color.primary,
}))

export const LogoImg = styled.div(({theme}) => ({
  position: 'absolute',
  left: 'calc(50vw - 3rem)',
  top: 'calc(50vh - 1rem)',
  width: '25rem',
  height: '10rem',
  mask: `url(${logoRest})`,
  maskRepeat: 'no-repeat',
  maskSize: 'contain',
  backgroundColor: theme.color.primary,
}))
