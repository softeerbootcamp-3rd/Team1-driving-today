import {type LoaderFunctionArgs, redirect} from 'react-router-dom'

import {
  isNumber,
  isString,
  isValidReservationDate,
  isValidReservationTime,
  isValidTrainingTime,
} from '@/utils/validate'

export function purchaseLoader({request}: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)

  const instructorId = searchParams.get('instructorId')
  const trainingTime = searchParams.get('trainingTime')
  const reservationTime = searchParams.get('reservationTime')
  const reservationDate = searchParams.get('reservationDate')
  const instructorName = searchParams.get('instructorName')
  const academyName = searchParams.get('academyName')
  const pricePerHour = searchParams.get('pricePerHour')

  if (
    isNumber(instructorId) &&
    isValidTrainingTime(trainingTime) &&
    isValidReservationTime(reservationTime) &&
    isValidReservationDate(reservationDate) &&
    isString(instructorName) &&
    isString(academyName) &&
    isNumber(pricePerHour)
  ) {
    return {
      instructorId: Number(instructorId),
      trainingTime: Number(trainingTime),
      reservationTime: Number(reservationTime),
      reservationDate,
      instructorName,
      academyName,
      pricePerHour: Number(pricePerHour),
    }
  }
  return redirect('/schedule')
}
