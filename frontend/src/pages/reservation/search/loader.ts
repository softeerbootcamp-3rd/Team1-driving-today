import {type LoaderFunctionArgs, redirect} from 'react-router-dom'

import {
  isValidLatitude,
  isValidLongitude,
  isValidReservationDate,
  isValidReservationTime,
  isValidTrainingTime,
} from '@/utils/validate'

export function searchPageLoader({request}: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const trainingTime = Number(searchParams.get('trainingTime'))
  const reservationTime = Number(searchParams.get('reservationTime'))
  const latitude = Number(searchParams.get('latitude'))
  const longitude = Number(searchParams.get('longitude'))
  const reservationDate = searchParams.get('reservationDate')
  if (
    isValidTrainingTime(trainingTime) &&
    isValidReservationTime(reservationTime) &&
    isValidReservationDate(reservationDate) &&
    isValidLongitude(longitude) &&
    isValidLatitude(latitude)
  ) {
    return {trainingTime, reservationTime, reservationDate, longitude, latitude}
  }
  return redirect('/reservation/schedule')
}
