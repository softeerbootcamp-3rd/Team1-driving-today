import {ImgHTMLAttributes} from 'react'

export function LazyImage(props: ImgHTMLAttributes<HTMLOrSVGImageElement>) {
  return <img {...props} />
}
