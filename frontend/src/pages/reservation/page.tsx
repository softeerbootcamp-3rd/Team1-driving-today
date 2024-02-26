import styled from '@emotion/styled'
import {useEffect, useRef, useState} from 'react'
import {CustomOverlayMap, Map, MarkerClusterer} from 'react-kakao-maps-sdk'
import {Outlet} from 'react-router-dom'

import {LazyImage} from '@/components/lazy-image'
import {InstructorsResponseItem, MapContextProvider, MapCoord} from '@/providers/map-context'

import {getCurrentPosition} from './schedule/hooks'

// NOTE: 기본위치 - 서울시청 좌표
const defaultPosition = {
  latitude: 37.566,
  longitude: 126.977,
}

export function StudentReservation() {
  const [coord, setCoord] = useState<MapCoord>(defaultPosition)
  const [markers, setMarkers] = useState<InstructorsResponseItem[] | undefined>()
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [hoverId, setHoverId] = useState<number | null>(null)
  const mapRef = useRef<kakao.maps.Map | null>(null)

  const mapPanTo = (latlng: kakao.maps.LatLng) => {
    mapRef.current?.panTo(latlng)
  }

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
  }, [])

  return (
    <>
      <MapContextProvider
        mapPanTo={mapPanTo}
        coord={coord}
        setMapMarkers={setMarkers}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        setHoverId={setHoverId}
        mapMarkers={markers}
      >
        <Outlet />
      </MapContextProvider>
      <Map
        id="map"
        isPanto
        ref={mapRef}
        center={{
          lat: coord.latitude,
          lng: coord.longitude,
        }}
        onDragEnd={(target) => {
          const newCenter = target.getCenter()
          setCoord({latitude: newCenter.getLat(), longitude: newCenter.getLng()})
        }}
        style={{
          width: '100%',
          height: '100%',
        }}
        level={3}
      >
        <MarkerClusterer averageCenter={true} minLevel={10}>
          {markers?.map((instructor) => {
            const {instructorId: id, latitude, longitude} = instructor
            return (
              <CustomOverlayMap
                key={id}
                position={{
                  lat: latitude,
                  lng: longitude,
                }}
                clickable
              >
                <MarkerContainer
                  key={id}
                  className={selectedId === id ? 'hatch' : ''}
                  selected={selectedId === id}
                  hover={hoverId === id}
                  onClick={() => {
                    const latlng = new kakao.maps.LatLng(latitude, longitude)
                    mapRef.current?.panTo(latlng)
                    setSelectedId(id)
                  }}
                >
                  <LazyImage
                    src="/marker.svg"
                    onMouseEnter={() => {
                      setHoverId(id)
                    }}
                    onMouseOut={() => {
                      setHoverId(null)
                    }}
                  />
                </MarkerContainer>
              </CustomOverlayMap>
            )
          })}
        </MarkerClusterer>
      </Map>
    </>
  )
}

const MarkerContainer = styled.div<{selected: boolean; hover: boolean}>(({selected, hover}) => ({
  cursor: 'pointer',
  width: 24,
  height: 34,
  transition: 'all 0.3s',
  transformOrigin: 'bottom center',
  transform: selected || hover ? 'scale(1.5)' : 'scale(1)',
  '&:hover': {
    transform: 'scale(1.5)',
  },
}))
