import styled from '@emotion/styled'

import logo from '../../assets/drive_logo.png'
import {LazyImage} from '../lazy-image'

const Img = styled(LazyImage)({
  height: '5rem',
  width: '12.5rem',
  objectFit: 'contain',
})

export function Logo() {
  return <Img src={logo}></Img>
}
