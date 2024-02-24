import {createContext, Dispatch, PropsWithChildren, SetStateAction, useContext} from 'react'

export interface MapCoord {
  latitude: number
  longitude: number
}

export interface InstructorsResponseItem {
  distance: number
  instructorId: number
  latitude: number
  longitude: number
  cert: boolean
  instructorImage: string
  pricePerHour: number
  instructorName: string
  academyName: string
  averageRating: number
}

const MapCoordContext = createContext<MapCoord | null>(null)

const MapPanToContext = createContext<((latlng: kakao.maps.LatLng) => void) | null>(null)

const SetMapMarkersContext = createContext<Dispatch<
  SetStateAction<InstructorsResponseItem[] | undefined>
> | null>(null)

const SetHoverIdContext = createContext<Dispatch<SetStateAction<number | null>> | null>(null)

const SelectedIdContext = createContext<number | null>(null)

const SetSelectedIdContext = createContext<Dispatch<SetStateAction<number | null>> | null>(null)

const MapMarkersContext = createContext<InstructorsResponseItem[] | undefined | null>(null)

interface MapContextProviderProps {
  coord: MapCoord
  mapPanTo: (latlng: kakao.maps.LatLng) => void
  setMapMarkers: Dispatch<SetStateAction<InstructorsResponseItem[] | undefined>>
  setHoverId: Dispatch<SetStateAction<number | null>>
  setSelectedId: Dispatch<SetStateAction<number | null>>
  mapMarkers: InstructorsResponseItem[] | undefined
  selectedId: number | null
}

export function MapContextProvider({
  coord,
  setMapMarkers,
  mapPanTo,
  selectedId,
  children,
  setSelectedId,
  setHoverId,
  mapMarkers,
}: PropsWithChildren<MapContextProviderProps>) {
  return (
    <MapPanToContext.Provider value={mapPanTo}>
      <MapCoordContext.Provider value={coord}>
        <SetMapMarkersContext.Provider value={setMapMarkers}>
          <SelectedIdContext.Provider value={selectedId}>
            <SetSelectedIdContext.Provider value={setSelectedId}>
              <MapMarkersContext.Provider value={mapMarkers}>
                <SetHoverIdContext.Provider value={setHoverId}>
                  {children}
                </SetHoverIdContext.Provider>
              </MapMarkersContext.Provider>
            </SetSelectedIdContext.Provider>
          </SelectedIdContext.Provider>
        </SetMapMarkersContext.Provider>
      </MapCoordContext.Provider>
    </MapPanToContext.Provider>
  )
}

export function useMapCoord() {
  const coord = useContext(MapCoordContext)
  if (coord === null) throw new Error('must be used inside map coord context')
  return coord
}

export function useMapPanTo() {
  const mapPanTo = useContext(MapPanToContext)
  if (mapPanTo === null) throw new Error('must be used inside map pan to context')
  return mapPanTo
}

export function useSetMapMarkers() {
  const setMapMarkers = useContext(SetMapMarkersContext)
  if (setMapMarkers === null) throw new Error('must be used inside map set markers context')
  return setMapMarkers
}

export function useSelectedId() {
  return useContext(SelectedIdContext)
}

export function useSetSelectedId() {
  const setSelectedId = useContext(SetSelectedIdContext)
  if (setSelectedId === null) throw new Error('must be used inside map set selected id context')
  return setSelectedId
}

export function useSetHoverId() {
  const setHoverId = useContext(SetHoverIdContext)
  if (setHoverId === null) throw new Error('must be used inside map set hover id context')
  return setHoverId
}

export function useMapMarkers() {
  const mapMarkers = useContext(MapMarkersContext)
  if (mapMarkers === null) throw new Error('must be used inside map markers context')
  return mapMarkers
}
