import {PropsWithChildren} from 'react'
import {createPortal} from 'react-dom'

export interface PortalProps {
  id: string
}

export function Portal({children, id}: PropsWithChildren<PortalProps>) {
  const container = document.getElementById(id) || document.body

  return <>{createPortal(children, container)}</>
}
