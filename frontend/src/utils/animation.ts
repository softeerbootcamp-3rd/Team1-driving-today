export interface ScrollAnimation {
  startFrame: number
  endFrame: number
  start: number
  end: number
  type: AnimationType
}

type AnimationType = 'scale' | 'translateX' | 'translateY' | 'rotate'

const units = {
  scale: '',
  translateX: 'vw',
  translateY: 'vh',
  rotate: 'deg',
}

export function animateElement(
  frame: number,
  animations: ScrollAnimation[] | undefined,
  elements: (HTMLElement | null)[] | null | undefined,
) {
  if (!elements || elements.length === 0 || !animations || animations.length === 0) return
  const currentAnimation = new Map<AnimationType, ScrollAnimation>()
  animations.forEach((v) => {
    const prev = currentAnimation.get(v.type)
    if (!prev) currentAnimation.set(v.type, v)
    // get current animation from animation list
    // overlaps are not considered
    if (frame >= v.startFrame) {
      if (frame <= v.endFrame) {
        // in an animation
        currentAnimation.set(v.type, v)
      } else {
        // need the latest
        if (prev && prev.endFrame < v.endFrame) {
          currentAnimation.set(v.type, v)
        }
      }
    }
  })

  const transitions = Array.from(currentAnimation.values()).map((v) => generateFrame(frame, v))
  if (transitions.length === 0) return
  const transform = transitions.reduce((pv, v) => pv + ' ' + v)
  elements.forEach((v) => {
    if (v === null) return
    v.style.transform = transform
  })
}

export function generateFrame(frame: number, animation: ScrollAnimation) {
  // set start if not started
  if (frame < animation.startFrame)
    return `${animation.type}(${animation.start}${units[animation.type]})`
  // set end if ended
  if (frame > animation.endFrame)
    return `${animation.type}(${animation.end}${units[animation.type]})`

  // during animation: need calc
  const amount = animation.end - animation.start
  const offset = frame - animation.startFrame
  const progress = offset / (animation.endFrame - animation.startFrame)
  const calculated = animation.start + amount * progress
  return `${animation.type}(${calculated}${units[animation.type]})`
}
