import {useRef} from 'react'

export function useScrollTo() {
  const itemsRef = useRef<Record<number, HTMLDivElement>>({})
  const setItemRef = (id: number, element: HTMLDivElement | null) => {
    if (element) itemsRef.current[id] = element
  }
  const listRef = useRef<HTMLDivElement>(null)
  const scrollTo = (id: number) => {
    if (!listRef.current) return
    const top = itemsRef.current[id].offsetTop - listRef.current.offsetTop
    listRef.current.scrollTo({top: top, behavior: 'smooth'})
  }

  return {setItemRef, listRef, scrollTo}
}
