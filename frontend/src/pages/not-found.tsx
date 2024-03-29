import styled from '@emotion/styled'
import {useEffect, useRef} from 'react'
import {Link} from 'react-router-dom'

import {Typography} from '@/components/typography'

export function NotFound() {
  const ref = useRef<HTMLHeadingElement>(null)

  const handleMouseMove = (event: MouseEvent) => {
    const textElement = ref.current
    if (!textElement) return

    const boundingRect = textElement.getBoundingClientRect()
    const relativeX = event.clientX - boundingRect.left
    const relativeY = event.clientY - boundingRect.top

    const normalizedX = relativeX / boundingRect.width
    const normalizedY = relativeY / boundingRect.height

    const shadowOffsetX = (normalizedX - 0.5) * 5
    const shadowOffsetY = (normalizedY - 0.5) * 5

    textElement.style.textShadow = `
    1px 1px 1px #052447,
    2px 2px 1px #052447,
    3px 3px 1px #052447,
    4px 4px 1px #052447,
    5px 5px 1px #052447,
    6px 6px 1px #052447,
    7px 7px 1px #052447,
    8px 8px 1px #052447,
    ${shadowOffsetX}px ${shadowOffsetY}px 1px #052447
  `
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <NotFoundContainer>
      <ErrorMessage ref={ref}>404</ErrorMessage>
      <Typography size="2rem" color="gray900" weight="normal" style={{textAlign: 'center'}}>
        요청하신 페이지를 찾을 수 없습니다.
        <br />
        입력하신 주소가 정확한지 다시 한번 확인해주세요.
      </Typography>
      <BackHomeButton to="/" replace>
        홈으로 돌아가기
      </BackHomeButton>
    </NotFoundContainer>
  )
}

const NotFoundContainer = styled.div(({theme}) => ({
  height: '100%',
  backgroundColor: theme.color.gray200,
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  alignItems: 'center',
  justifyContent: 'center',
}))

const ErrorMessage = styled.h1(({theme}) => ({
  fontSize: '9rem',
  color: theme.color.primary,
  textAlign: 'center',
  textShadow: `1px 1px 1px #052447,    
      2px 2px 1px #052447,
      3px 3px 1px #052447,
      4px 4px 1px #052447,
      5px 5px 1px #052447,
      6px 6px 1px #052447,
      7px 7px 1px #052447,
      8px 8px 1px #052447,
      25px 25px 8px rgba(0,0,0, 0.2)`,
}))

const BackHomeButton = styled(Link)(({theme}) => ({
  display: 'inline-block',
  border: `2px solid ${theme.color.gray900}`,
  color: theme.color.gray200,
  textTransform: 'uppercase',
  fontWeight: 600,
  padding: '0.75rem 1rem 0.6rem',
  transition: 'all 0.2s linear',
  boxShadow: '0 15px 15px -11px rgba(0,0,0, 0.4)',
  background: theme.color.gray900,
  borderRadius: '6px',
  fontSize: '1.6rem',
  width: 'fit-content',
  marginTop: '2rem',

  '&:hover': {
    background: theme.color.gray900,
    color: theme.color.gray300,
    transform: 'scale(1.1)',
  },
}))
