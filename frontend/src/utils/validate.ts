// TODO: Need to do unit test

/**
 * trainingTime이 1 또는 2인지 확인합니다.
 */
export function isValidTrainingTime(trainingTime: unknown): trainingTime is number {
  return (
    isNumber(trainingTime) &&
    Number.isInteger(Number(trainingTime)) &&
    (Number(trainingTime) === 1 || Number(trainingTime) === 2)
  )
}

/**
 * reservationTime이 9에서 17 사이의 정수인지 확인합니다.
 */
export function isValidReservationTime(reservationTime: unknown): reservationTime is number {
  return (
    isNumber(reservationTime) &&
    Number.isInteger(Number(reservationTime)) &&
    Number(reservationTime) >= 9 &&
    Number(reservationTime) <= 17
  )
}

/**
 * latitude가 유효한 위도 값인지 확인합니다.
 */
export function isValidLatitude(latitude: unknown) {
  return isNumber(latitude) && Number(latitude) >= -90 && Number(latitude) <= 90
}

/**
 * longitude가 유효한 경도 값인지 확인합니다.
 */
export function isValidLongitude(longitude: unknown) {
  return isNumber(longitude) && Number(longitude) >= -180 && Number(longitude) <= 180
}

/**
 * reservationDate가 유효한 날짜 형식인지 확인합니다.
 */
export function isValidReservationDate(reservationDate: unknown): reservationDate is string {
  // yyyy-mm-dd 형식 확인
  const regex = /^\d{4}-\d{2}-\d{2}$/
  return isString(reservationDate) && regex.test(reservationDate)
}

/**
 * value가 string 인지 확인합니다.
 */
export function isString<U>(value: string | U): value is string {
  return typeof value === 'string'
}

/**
 * value가 number 인지 확인합니다.
 */
export function isNumber<U>(value: number | U): value is number {
  return value !== null && (typeof value === 'number' || !isNaN(Number(value)))
}
