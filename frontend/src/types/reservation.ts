export interface InstructorReservation {
  instructorId: number
  reservationId: number
  instructorImage: string
  instructorName: string
  academyName: string
  reservationDate: string
  reservationTime: number
  trainingTime: number
}

export interface StudentReservation {
  reservationId: number
  studentImage: string
  studentName: string
  phoneNumber: string
  reservationDate: string
  reservationTime: number
  trainingTime: number
  studentId: number
  isUpcoming: boolean
}
