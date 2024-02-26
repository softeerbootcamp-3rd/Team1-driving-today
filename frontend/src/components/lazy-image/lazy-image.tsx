import {ImgHTMLAttributes} from 'react'

export function LazyImage(props: Omit<ImgHTMLAttributes<HTMLOrSVGImageElement>, 'loading'>) {
  return <img {...props} loading='lazy' />
}
