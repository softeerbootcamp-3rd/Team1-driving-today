import styled from '@emotion/styled'

import logo from '../../assets/drive_logo.png'

const Img = styled.img({
  height: '5rem',
  width: '12.5rem',
  objectFit: 'contain',
})

export function Logo() {
  return <Img src={logo}></Img>
}
