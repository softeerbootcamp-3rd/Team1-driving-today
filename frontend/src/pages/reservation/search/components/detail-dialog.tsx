import {Theme} from '@emotion/react'
import styled from '@emotion/styled'
import {CSSProperties} from 'react'
import {useLoaderData, useNavigate} from 'react-router-dom'

import {Button} from '@/components/button'
import {Divider} from '@/components/divider'
import {Icon} from '@/components/icon'
import {Loading} from '@/components/loading'
import {Rating} from '@/components/rating'
import {useApiCall} from '@/hooks/use-api-call'
import {useInfiniteFetch} from '@/hooks/use-infinite-fetch'
import {useIntersectionObserver} from '@/hooks/use-intersection-observer'
import {useChatModal} from '@/providers'
import {apiCall} from '@/utils/api'
import {objectToQS} from '@/utils/object-to-qs'

import type {LoaderData} from '../types'
interface DetailDialogProps {
  id: number
  onClose: () => void
}
export function DetailDialog({id, onClose}: DetailDialogProps) {
  return (
    <Dialog>
      <DialogHeader>
        <Typograpy as="h1" color="gray900" size="2rem" weight="bold">
          강사 상세 정보
        </Typograpy>
        <Icon
          name="close"
          width="1.4rem"
          height="1.4rem"
          color="gray900"
          onClick={onClose}
          style={{cursor: 'pointer'}}
        >
          닫기
        </Icon>
      </DialogHeader>
      <DialogContent>
        <InstructorDetail key={id} id={id} />
      </DialogContent>
    </Dialog>
  )
}

const Dialog = styled.div(() => ({
  position: 'absolute',
  left: '105%',
  top: '2rem',
  width: '35rem',
  height: '90%',
  backgroundColor: 'white',
  borderRadius: '1.6rem',
  boxShadow: '5px 5px 5px 0px rgb(0 0 0 / 15%)',
  display: 'flex',
  flexDirection: 'column',
}))

const DialogHeader = styled.div(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '2rem',
}))

const DialogContent = styled.div(() => ({
  padding: '0 2rem 0',
  height: '100%',
  flex: '1 1 0',
  overflowY: 'scroll',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
}))

interface InstructorDetailResponse {
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

type ReviewResponseItem = {
  id: number
  contents: string
  rating: number
  createdAt: string
}

interface ReviewResponse {
  content: ReviewResponseItem[]
  currentPage: number
  first: boolean
  last: boolean
  size: number
}

const PAGE_SIZE = 5
function InstructorDetail({id}: {id: number}) {
  // TODO: use suspendedApiCall?
  const instructorDetail = useApiCall<InstructorDetailResponse>(`/instructors/${id}`)
  const chatModal = useChatModal()
  // TODO: error handling
  const {
    data: reviews,
    loading,
    fetchNextPage,
  } = useInfiniteFetch({
    queryFn: async ({pageParam}): Promise<ReviewResponseItem[]> => {
      const res = await apiCall(
        `/reviews?instructorId=${id}&pageNumber=${pageParam}&pageSize=${PAGE_SIZE}`,
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

  const navigate = useNavigate()
  const {trainingTime, reservationTime, reservationDate} = useLoaderData() as LoaderData

  return (
    <>
      <Flex as="section" gap="1rem" flexDirection="column">
        <Flex gap="2rem" flexDirection="row" alignItems="center">
          <Avartar
            src={instructorDetail.data?.instructorInfo.instructorImage}
            width="62"
            height="62"
          />
          <Typograpy color="gray700" size="2rem" weight="bold">
            {instructorDetail.data?.instructorInfo.name}
          </Typograpy>
        </Flex>
        <Flex as="ul">
          <Typograpy as="li" color="gray600" weight="500" size="1.4rem">
            평점 4.5
          </Typograpy>
          <Divider orientation="vertical" flexItem style={{margin: '0.5rem'}} />
          <Typograpy as="li" color="gray600" weight="500" size="1.4rem">
            시간당 {instructorDetail.data?.instructorInfo.pricePerHour.toLocaleString()}
          </Typograpy>
        </Flex>
        <Flex alignItems="center">
          <Icon name="building" width="2rem" height="2rem" color="gray600" />
          <Typograpy as="span" color="gray600" weight="500" size="1.4rem">
            {instructorDetail.data?.academyInfo.name}
          </Typograpy>
        </Flex>
        <Actions>
          <Button
            type="button"
            onClick={() => {
              chatModal.handleOpen({content: 'ROOM', id: id})
            }}
          >
            문의
          </Button>
          <Button
            type="button"
            onClick={() => {
              const searchParams = objectToQS({
                instructorId: id,
                reservationDate,
                reservationTime,
                trainingTime,
                instructorName: instructorDetail.data?.instructorInfo.name,
                academyName: instructorDetail.data?.academyInfo.name,
                pricePerHour: instructorDetail.data?.instructorInfo.pricePerHour,
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
        <Typograpy as="h1" color="gray600" size="1.6rem" weight="bold">
          강사 소개
        </Typograpy>
        <Typograpy as="p" color="gray900" weight="500" size="1.4rem">
          {instructorDetail.data?.instructorInfo.introduction}
        </Typograpy>
      </Flex>
      <Divider />
      <Flex as="section" flexDirection="column" gap="1rem">
        <Typograpy as="h1" color="gray600" size="1.6rem" weight="bold">
          리뷰
        </Typograpy>
        <Flex as="ul" gap="2.5rem" flexDirection="column" style={{paddingBottom: '4rem'}}>
          {reviews?.map((review) => (
            <Flex as="li" flexDirection="column" gap="1.5rem" key={review.id}>
              <Flex gap="1rem" alignItems="center">
                {/* <Avartar
                  src={instructorDetail.data?.instructorInfo.instructorImage}
                  width="30"
                  height="30"
                /> */}
                {/* <Typograpy color="gray900" size="1.4rem" weight="bold">
                  {review.reviewerName}
                </Typograpy> */}
              </Flex>
              <Flex justifyContent="space-between">
                <Rating defaultValue={review.rating} readOnly />
                <Typograpy as="span" color="gray600" size="1.4rem" weight="500">
                  {new Date(review.createdAt).toLocaleDateString('ko-KR')}
                </Typograpy>
              </Flex>
              <Typograpy as="p" color="gray900" size="1.4rem" weight="500">
                {review.contents}
              </Typograpy>
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
    </>
  )
}

type FlexProps = Pick<
  CSSProperties,
  'justifyContent' | 'alignItems' | 'flexDirection' | 'flexWrap' | 'flexGrow' | 'gap'
>
const Flex = styled.div<FlexProps>(
  ({justifyContent, alignItems, flexDirection, flexGrow, flexWrap, gap}) => ({
    display: 'flex',
    justifyContent,
    alignItems,
    flexDirection,
    flexGrow,
    flexWrap,
    gap,
  }),
)

const Typograpy = styled.span<{
  color: keyof Theme['color']
  size: CSSProperties['fontSize']
  weight: CSSProperties['fontWeight']
}>(({theme, color, size, weight}) => ({
  color: theme.color[color],
  fontSize: size,
  fontWeight: weight,
}))

const Avartar = styled.img(({width, height}) => ({
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
