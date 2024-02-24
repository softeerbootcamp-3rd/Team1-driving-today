import {keyframes} from '@emotion/react'
import styled from '@emotion/styled'
import {CSSProperties, type HTMLAttributes} from 'react'

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 스켈레톤의 너비
   */
  width?: CSSProperties['width']
  /**
   * 스켈레톤의 높이
   */
  height?: CSSProperties['height']
  /**
   * 렌더링 될 스켈레톤 컴포넌트의 타입
   * @default "text"
   */
  variant?: 'circular' | 'rectangular' | 'rounded' | 'text'
}

export const Skeleton = styled.div<SkeletonProps>(({variant = 'text', width, height, theme}) => ({
  ...variants[variant],
  height: height || '1.2em',
  width,
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: theme.color.gray200,
  '&::after': {
    animation: `${waveKeyframe} 1.6s linear 0.5s infinite`,
    background: 'linear-gradient(90deg, transparent, #ddd, transparent)',
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
}))

const waveKeyframe = keyframes`
  0% {
    transform: translateX(-100%);
  }
  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }
  100% {
    transform: translateX(100%);
  }
`

const variants: Record<string, Record<string, unknown>> = {
  rectangular: {},
  circular: {
    borderRadius: '9999px',
  },
  rounded: {
    borderRadius: '0.8rem',
  },
  text: {
    marginTop: 0,
    marginBottom: 0,
    height: 'auto',
    transformOrigin: '0 55%',
    transform: 'scale(1, 0.60)',
    borderRadius: '4px / 6.7px',
    '&:empty::before': {
      content: '"\\00a0"',
    },
  },
}
