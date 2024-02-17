/**
 * trainingTime이 1 또는 2인지 확인합니다.
 */
export function isValidTrainingTime(trainingTime: number | null) {
  return typeof trainingTime === 'number' && (trainingTime === 1 || trainingTime === 2)
}

/**
 * reservationTime이 9에서 17 사이의 정수인지 확인합니다.
 */
export function isValidReservationTime(reservationTime: number | null) {
  return (
    typeof reservationTime === 'number' &&
    Number.isInteger(reservationTime) &&
    reservationTime >= 9 &&
    reservationTime <= 17
  )
}

/**
 * latitude가 유효한 위도 값인지 확인합니다.
 */
export function isValidLatitude(latitude: number) {
  return !isNaN(latitude) && latitude >= -90 && latitude <= 90
}

/**
 * longitude가 유효한 경도 값인지 확인합니다.
 */
export function isValidLongitude(longitude: number) {
  return !isNaN(longitude) && longitude >= -180 && longitude <= 180
}

/**
 * reservationDate가 유효한 날짜 형식인지 확인합니다.
 */
export function isValidReservationDate(reservationDate: string | null) {
  // yyyy-mm-dd 형식 확인
  const regex = /^\d{4}-\d{2}-\d{2}$/
  return isString(reservationDate) && regex.test(reservationDate)
}

/**
 * value가 string 형식인지 확인합니다.
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string'
}
