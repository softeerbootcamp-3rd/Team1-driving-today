export interface ScheduleForm {
  trainingTime: number | null
  reservationTime: number | null
  reservationDate: string
}

export type ScheduleFormError = {
  [key in keyof ScheduleForm]?: {
    type: string
    message: string
  }
}
