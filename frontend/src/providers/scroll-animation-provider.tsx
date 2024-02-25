import styled from '@emotion/styled'
import {createContext, PropsWithChildren, useContext, useEffect, useRef} from 'react'

interface ScrollAnimationProviderProps {
  loop?: boolean
  max?: number
  start?: number
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

const TOUCH_MULTIPLIER = 5
const LERP = 0.005
const PRECISION = 0.01

export function ScrollAnimationProvider({
  children,
  loop,
  start = 0,
  max = Number.MAX_SAFE_INTEGER,
}: PropsWithChildren<ScrollAnimationProviderProps>) {
  const scrollRef = useRef(start)
  console.log(scrollRef.current)
  const callbacksRef = useRef<ScrollCallbacks>(initialScrollCallbacks)
  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!divRef.current) return
    const divToWatch = divRef.current
    const onScroll = (e: WheelEvent) => {
      e.preventDefault()
      scrollRef.current += Math.min(200, Math.max(-200, e.deltaY))
      if (scrollRef.current < 0) scrollRef.current = 0
      else if (scrollRef.current > max) scrollRef.current = loop ? scrollRef.current - max : max
    }
    divToWatch.addEventListener('wheel', onScroll)

    // enable wheel event on touch devices
    if ('ontouchstart' in window) {
      let y = 0
      divToWatch.ontouchstart = (e) => {
        e.preventDefault()
        y = e.touches[0].clientY
      }
      divToWatch.ontouchmove = (e) => {
        e.preventDefault()

        scrollRef.current += Math.min(
          200,
          Math.max(-200, (y - e.touches[0].clientY) * TOUCH_MULTIPLIER),
        )
        if (scrollRef.current < 0) scrollRef.current = 0
        else if (scrollRef.current > max) scrollRef.current = loop ? scrollRef.current - max : max
        y = e.touches[0].clientY
      }
      divToWatch.ontouchend = (e) => e.preventDefault()
    }

    let running = true
    let prevFrame = -1
    let prevTime = 0

    const tick = (time: DOMHighResTimeStamp) => {
      if (Math.abs(prevFrame - scrollRef.current) > PRECISION) {
        const timeDelta = time - prevTime
        // 최댄거리 찾기
        const frameDelta = getFrameDelta(scrollRef.current, prevFrame, max, 0)
        prevFrame += frameDelta * LERP * timeDelta
        if (prevFrame < 0) prevFrame = loop ? max + prevFrame : 0
        else if (prevFrame > max) prevFrame = loop ? prevFrame - max : max
        callbacksRef.current.run(prevFrame)
        prevTime = time
      }

      prevTime = time
      if (running) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
    return () => {
      divToWatch.removeEventListener('wheel', onScroll)
      running = false
    }
  }, [loop, max, start])

  return (
    <ScrollAnimationContext.Provider value={callbacksRef}>
      <Container ref={divRef}>{children}</Container>
    </ScrollAnimationContext.Provider>
  )
}

function getFrameDelta(target: number, current: number, max: number, min: number) {
  const delta = target - current
  if (delta > 0) {
    //정방향 혹은 역방향 루프 통과
    const a = target - current
    const b = current - min + max - target
    if (a > b) return -b
    return a
  } else {
    //역방향 혹은 정방향 루프 통과
    const a = current - target
    const b = max - current + target - min
    if (a > b) return b
    return -a
  }
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
