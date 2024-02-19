import {useEffect, useState} from 'react'

export type Coord = Pick<GeolocationCoordinates, 'latitude' | 'longitude'>

export function useCurrentPosition({defaultPosition}: {defaultPosition: Coord}) {
  const [coord, setCoord] = useState<Coord>(defaultPosition)

  useEffect(() => {
    if ('geolocation' in navigator) {
      getCurrentPosition()
        .then((position) => {
          const {
            coords: {latitude, longitude},
          } = position
          setCoord({latitude, longitude})
        })
        .catch(() => {
          setCoord(defaultPosition)
        })
    } else {
      alert('현재 위치 정보를 제공하지 않는 브라우저 입니다.')
    }
  }, [defaultPosition])

  return coord
}

function getCurrentPosition(options?: PositionOptions): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options)
  })
}
