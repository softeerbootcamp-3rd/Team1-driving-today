export interface InstructorInfoResponse {
  instructorInfo: {
    id: number
    name: string
    phoneNumber: string
    instructorImage: string
    pricePerHour: number
    introduction: string
  }
  academyInfo: {
    name: string
    latitude: number
    longitude: number
    cert: boolean
  }
  averageRating: number
}

export interface StudentInfoResponse {
  name: string
  phoneNumber: string
  studentImage: string
  nickname: string
}
