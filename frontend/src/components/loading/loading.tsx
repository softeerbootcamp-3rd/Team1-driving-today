import {keyframes} from '@emotion/react'
import styled from '@emotion/styled'

export function Loading() {
  return (
    <LoadingContainer>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </LoadingContainer>
  )
}

const ellipsis1 = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`
const ellipsis2 = keyframes`
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
`
const ellipsis3 = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`

const LoadingContainer = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  & div {
    position: absolute;
    top: 33px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${({theme}) => theme.color.primary};
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }

  & div:nth-of-type(1) {
    left: 8px;
    animation: ${ellipsis1} 0.6s infinite;
  }
  & div:nth-of-type(2) {
    left: 8px;
    animation: ${ellipsis2} 0.6s infinite;
  }
  & div:nth-of-type(3) {
    left: 32px;
    animation: ${ellipsis2} 0.6s infinite;
  }
  & div:nth-of-type(4) {
    left: 56px;
    animation: ${ellipsis3} 0.6s infinite;
  }
`
