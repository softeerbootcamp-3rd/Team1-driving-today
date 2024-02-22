import styled from '@emotion/styled'
import {createContext, PropsWithChildren, useContext, useEffect, useRef} from 'react'

const DEFAULT_MAX = 99999999999

interface ScrollAnimationProviderProps {
  loop?: boolean
  max?: number
}

const initialScrollCallbacks: ScrollCallbacks = {
  callbacks: new Map<string, (frame: number) => void>(),
  addCallback(id: string, callback: (frame: number) => void) {
    this.callbacks.set(id, callback)
  },
  removeCallback(id: string) {
    this.callbacks.delete(id)
  },
  run(frame: number) {
    for (const c of this.callbacks.values()) {
      c(frame)
    }
  },
}

export function ScrollAnimationProvider({
  children,
  loop,
  max = DEFAULT_MAX,
}: PropsWithChildren<ScrollAnimationProviderProps>) {
  const scrollRef = useRef(0)
  const callbacksRef = useRef<ScrollCallbacks>(initialScrollCallbacks)
  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!divRef.current) return
    const divToWatch = divRef.current
    const onScroll = (e: WheelEvent) => {
      e.preventDefault()
      scrollRef.current += Math.min(200, Math.max(-200, e.deltaY))
      if (scrollRef.current < 0) scrollRef.current = loop ? max + scrollRef.current : 0
      else if (scrollRef.current > max) scrollRef.current = loop ? scrollRef.current - max : max
    }
    divToWatch.addEventListener('wheel', onScroll)

    let running = true
    const tick = () => {
      callbacksRef.current.run(scrollRef.current)
      if (running) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
    return () => {
      divToWatch.removeEventListener('wheel', onScroll)
      running = false
    }
  }, [])

  return (
    <ScrollAnimationContext.Provider value={callbacksRef}>
      <Container ref={divRef}>{children}</Container>
    </ScrollAnimationContext.Provider>
  )
}

export function useScrollAnimationFrame(id: string, callback: (frame: number) => void) {
  const scroll = useContext(ScrollAnimationContext)
  if (scroll === null) throw new Error('must be used inside scroll animation provider')

  useEffect(() => {
    const scrollCallbacks = scroll.current
    scrollCallbacks.addCallback(id, callback)
    return () => scrollCallbacks.removeCallback(id)
  }, [callback, id, scroll])
}

interface ScrollCallbacks {
  callbacks: Map<string, (frame: number) => void>
  addCallback: (id: string, callback: (frame: number) => void) => void
  removeCallback: (id: string) => void
  run: (frame: number) => void
}

export const ScrollAnimationContext = createContext<React.MutableRefObject<ScrollCallbacks> | null>(
  null,
)

const Container = styled.div(({theme}) => ({
  position: 'relative',
  backgroundColor: theme.color.white,
  overflow: 'hidden',
  height: '100vh',
  width: '100vw',
  '& *': {
    // transition: 'all 0.1s ease',
  },
}))
