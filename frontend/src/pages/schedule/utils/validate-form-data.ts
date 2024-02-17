import {isValidReservationDate, isValidReservationTime, isValidTrainingTime} from '@/utils/validate'

import type {ScheduleForm, ScheduleFormError} from '../types'

export function validateFormData(formData: ScheduleForm): ScheduleFormError | null {
  const validReservationDate = isValidReservationDate(formData.reservationDate)
  const validReservationTime = isValidReservationTime(formData.reservationTime)
  const validTrainingTime = isValidTrainingTime(formData.trainingTime)

  if (validReservationDate && validReservationTime && validTrainingTime) return null

  const errors = {} as ScheduleFormError
  if (!validReservationDate) {
    errors.reservationDate = {type: 'required', message: '예약 날짜를 입력해주세요.'}
  }
  if (!validReservationTime) {
    errors.reservationTime = {type: 'required', message: '원하는 시작 시간을 선택해주세요.'}
  }
  if (!validTrainingTime) {
    errors.trainingTime = {type: 'required', message: '연수 타입을 선택해주세요.'}
  }
  return errors
}
