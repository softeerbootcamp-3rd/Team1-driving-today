import {Theme} from '@emotion/react'
import styled from '@emotion/styled'
import {CSSProperties} from 'react'
import {useNavigate, useSearchParams} from 'react-router-dom'

import {Button} from '@/components/button'
import {Divider} from '@/components/divider'
import {Icon} from '@/components/icon'
import {Rating} from '@/components/rating'

import {detailData, reviewData} from '../data'

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
        <InstructorDetail id={id} />
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

function InstructorDetail({id}: {id: number}) {
  // TODO: 상세 정보, 리뷰 리스트 받아오기(무한스크롤)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const trainingTime = Number(searchParams.get('trainingTime'))
  const reservationTime = Number(searchParams.get('reservationTime'))
  const reservationDate = searchParams.get('reservationDate')

  return (
    <>
      <Flex as="section" gap="1rem" flexDirection="column">
        <Flex gap="2rem" flexDirection="row" alignItems="center">
          <Avartar src={detailData.instructorInfo.instructorImage} width="62" height="62" />
          <Typograpy color="gray700" size="2rem" weight="bold">
            {detailData.instructorInfo.name}
          </Typograpy>
        </Flex>
        <Flex as="ul">
          <Typograpy as="li" color="gray600" weight="500" size="1.4rem">
            평점 4.5
          </Typograpy>
          <Divider orientation="vertical" flexItem style={{margin: '0.5rem'}} />
          <Typograpy as="li" color="gray600" weight="500" size="1.4rem">
            시간당 {detailData.instructorInfo.pricePerHour.toLocaleString()}
          </Typograpy>
        </Flex>
        <Flex alignItems="center">
          <Icon name="building" width="2rem" height="2rem" color="gray600" />
          <Typograpy as="span" color="gray600" weight="500" size="1.4rem">
            {detailData.academyInfo.name}
          </Typograpy>
        </Flex>
        <Actions>
          <Button>문의</Button>
          <Button
            onClick={() => {
              navigate('/purchase', {
                state: {
                  instructorId: detailData.instructorInfo.id,
                  reservationDate,
                  reservationTime,
                  trainingTime,
                  instructorName: detailData.instructorInfo.name,
                  academyName: detailData.academyInfo.name,
                  pricePerHour: detailData.instructorInfo.pricePerHour,
                },
              })
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
          {detailData.instructorInfo.introduction}
        </Typograpy>
      </Flex>
      <Divider />
      <Flex as="section" flexDirection="column" gap="1rem">
        <Typograpy as="h1" color="gray600" size="1.6rem" weight="bold">
          리뷰
        </Typograpy>
        <Flex as="ul" gap="2.5rem" flexDirection="column" style={{paddingBottom: '4rem'}}>
          {reviewData.map((review) => (
            <Flex as="li" flexDirection="column" gap="1.5rem" key={review.reviewId}>
              <Flex gap="1rem" alignItems="center">
                <Avartar src={detailData.instructorInfo.instructorImage} width="30" height="30" />
                <Typograpy color="gray900" size="1.4rem" weight="bold">
                  {review.reviewerName}
                </Typograpy>
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
