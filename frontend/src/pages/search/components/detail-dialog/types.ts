export interface InstructorDetailResponse {
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

export type ReviewResponseItem = {
  id: number
  contents: string
  rating: number
  createdAt: string
  reviewerName: string
  reviewerImage: string
}

export interface ReviewResponse {
  content: ReviewResponseItem[]
  currentPage: number
  first: boolean
  last: boolean
  size: number
}
