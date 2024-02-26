import styled from '@emotion/styled'
import {Suspense} from 'react'
import {useLoaderData, useNavigate} from 'react-router-dom'

import {Button} from '@/components/button'
import {Divider} from '@/components/divider'
import {Flex} from '@/components/flex'
import {Icon} from '@/components/icon'
import {LazyImage} from '@/components/lazy-image'
import {Loading} from '@/components/loading'
import {Rating} from '@/components/rating'
import {Typography} from '@/components/typography'
import {useSuspendedApiCall} from '@/hooks/use-api-call'
import {useInfiniteFetch} from '@/hooks/use-infinite-fetch'
import {useIntersectionObserver} from '@/hooks/use-intersection-observer'
import {LoaderData} from '@/pages/reservation/search/types'
import {useChatModal} from '@/providers'
import {apiCall} from '@/utils/api'
import {objectToQS} from '@/utils/object-to-qs'

import type {InstructorDetailResponse, ReviewResponse, ReviewResponseItem} from './types'

const PAGE_SIZE = 10
export function InstructorDetail({id}: {id: number}) {
  return (
    <>
      <Suspense>
        <InstructorInfo instructorId={id} />
      </Suspense>
      <Divider />
      <InstructorReviews instructorId={id} />
    </>
  )
}

function InstructorInfo({instructorId}: {instructorId: number}) {
  const {data: instroctorDetail} = useSuspendedApiCall<InstructorDetailResponse>(
    `/instructors/${instructorId}`,
  )
  const chatModal = useChatModal()
  const navigate = useNavigate()
  const {trainingTime, reservationTime, reservationDate} = useLoaderData() as LoaderData

  if (!instroctorDetail) return null

  const {instructorInfo, academyInfo, averageRating} = instroctorDetail
  return (
    <>
      <Flex as="section" gap="1rem" flexDirection="column">
        <Flex gap="2rem" flexDirection="row" alignItems="center">
          <Avartar src={instructorInfo.instructorImage} width={62} height={62} />
          <Typography color="gray700" size="2rem" weight="bold">
            {instructorInfo.name}
          </Typography>
        </Flex>
        <Flex as="ul">
          <Typography as="li" color="gray600" weight="500" size="1.4rem">
            평점 {averageRating.toPrecision(2)}
          </Typography>
          <Divider orientation="vertical" flexItem style={{margin: '0.5rem'}} />
          <Typography as="li" color="gray600" weight="500" size="1.4rem">
            시간당 {instructorInfo.pricePerHour.toLocaleString()}
          </Typography>
        </Flex>
        <Flex alignItems="center">
          <Icon name="building" width="2rem" height="2rem" color="gray600" />
          <Typography as="span" color="gray600" weight="500" size="1.4rem">
            {academyInfo.name}
          </Typography>
        </Flex>
        <Actions>
          <Button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              chatModal.handleOpen({content: 'ROOM', id: instructorId})
            }}
          >
            문의
          </Button>
          <Button
            type="button"
            onClick={() => {
              const searchParams = objectToQS({
                instructorId: instructorId,
                reservationDate,
                reservationTime,
                trainingTime,
                instructorName: instructorInfo.name,
                academyName: academyInfo.name,
                pricePerHour: instructorInfo.pricePerHour,
              })
              navigate(`/purchase?${searchParams}`)
            }}
          >
            예약
          </Button>
        </Actions>
      </Flex>
      <Divider />
      <Flex as="section" flexDirection="column" gap="1rem">
        <Typography as="h1" color="gray600" size="1.6rem" weight="bold">
          강사 소개
        </Typography>
        <Typography as="p" color="gray900" weight="500" size="1.4rem">
          {instructorInfo.introduction}
        </Typography>
      </Flex>
    </>
  )
}

function InstructorReviews({instructorId}: {instructorId: number}) {
  // TODO: error handling
  const {
    data: reviews,
    loading,
    fetchNextPage,
  } = useInfiniteFetch({
    queryFn: async ({pageParam}): Promise<ReviewResponseItem[]> => {
      const res = await apiCall(
        `/reviews?instructorId=${instructorId}&pageNumber=${pageParam}&pageSize=${PAGE_SIZE}`,
      )
      if (!res.ok) throw new Error('server error')
      const reviewResponse = (await res.json()) as ReviewResponse
      return reviewResponse.content
    },
    initialPageParam: 1,
    getNextPageParam: ({pageParam, lastPage}) => {
      const isLastPage = lastPage.length < PAGE_SIZE
      const nextPageParam = pageParam + 1
      return isLastPage ? undefined : nextPageParam
    },
  })
  const intersectedRef = useIntersectionObserver(() => fetchNextPage())

  return (
    <Flex as="section" flexDirection="column" gap="1rem">
      <Typography as="h1" color="gray600" size="1.6rem" weight="bold">
        리뷰
      </Typography>
      <Flex as="ul" gap="2.5rem" flexDirection="column" style={{paddingBottom: '4rem'}}>
        {reviews?.map((review) => (
          <Flex as="li" flexDirection="column" gap="1.5rem" key={review.reviewId}>
            <Flex gap="1rem" alignItems="center">
              <Avartar src={review.reviewerImage} width={30} height={30} />
              <Typography color="gray900" size="1.4rem" weight="bold">
                {review.reviewerName}
              </Typography>
            </Flex>
            <Flex justifyContent="space-between">
              <Rating defaultValue={review.rating} readOnly />
              <Typography as="span" color="gray600" size="1.4rem" weight="500">
                {new Date(review.createdAt).toLocaleDateString('ko-KR')}
              </Typography>
            </Flex>
            <Typography as="p" color="gray900" size="1.4rem" weight="500">
              {review.contents}
            </Typography>
          </Flex>
        ))}
        <div ref={intersectedRef} style={{height: '3rem'}}></div>
        {loading && (
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Loading />
          </div>
        )}
      </Flex>
    </Flex>
  )
}

const Avartar = styled(LazyImage)(({width, height}) => ({
  borderRadius: '50%',
  width,
  height,
}))

const Actions = styled.div(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '0.5rem',
  '& > button': {
    width: 'auto',
  },
}))
