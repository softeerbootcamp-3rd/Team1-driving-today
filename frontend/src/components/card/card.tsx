/* eslint-disable react-refresh/only-export-components */
import {Theme} from '@emotion/react'
import styled from '@emotion/styled'
import {forwardRef, HTMLAttributes, PropsWithChildren} from 'react'

import {Button} from '../button'
import {Icon, IconName} from '../icon'
import {Skeleton} from '../skeleton'

interface BaseContainerProps {
  selected?: boolean
}

const BaseContainer = styled.div<BaseContainerProps>(({theme, selected}) => ({
  display: 'flex',
  padding: '2rem',
  gap: '2rem',
  borderRadius: '1.6rem',
  alignItems: 'center',
  backgroundColor: selected ? theme.color.gray100 : theme.color.white,
  border: `1px solid ${theme.color.gray200}`,
}))

const ContentContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  flexGrow: 1,
})

const ActionsContainer = styled.div({
  display: 'flex',
  paddingTop: '1rem',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '0.5rem',
  '& > button': {
    width: 'auto',
  },
})

const Name = styled.p(({theme}) => ({
  color: theme.color.gray600,
  fontWeight: 700,
  fontSize: '2rem',
}))

interface LabelProps {
  color: keyof Theme['color']
}

const Label = styled.p<LabelProps>(({theme, color}) => ({
  color: theme.color[color],
  fontWeight: 500,
  fontSize: '1.6rem',
}))

const MultipleDescriptionContainer = styled.div(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  '& > ::before': {
    content: '""',
    height: '1rem',
    border: `1px solid ${theme.color.gray300}`,
    borderRadius: '5rem',
    margin: '0 1rem',
  },
  '& > :first-of-type::before': {
    border: 'none',
    margin: 0,
  },
}))

const IconLabelContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  '& > * + *': {marginLeft: '0.5rem'},
})

interface IconLabelProps extends LabelProps {
  icon: IconName
}

function IconLabel({icon, color, children}: PropsWithChildren<IconLabelProps>) {
  return (
    <IconLabelContainer>
      <Icon name={icon} color={color} width="2rem" height="2rem" />
      <Label color={color}>{children}</Label>
    </IconLabelContainer>
  )
}

const ProfilePic = styled.img(({theme}) => ({
  flex: '0 0 10rem',
  width: '10rem',
  height: '10rem',
  borderRadius: '50%',
  overflow: 'hidden',
  backgroundColor: theme.color.gray300,
}))

interface CardProps extends HTMLAttributes<HTMLDivElement>, BaseContainerProps {}

interface ReservationResultProps extends CardProps {
  instructorName: string
  academyName: string
  pricePerHour: number
  image: string
  distance: number
  duration: number
  rating: number
  onRequestReservation?: () => void
  onContact?: () => void
}

function ReservationResultCard({
  instructorName,
  academyName,
  pricePerHour,
  image,
  distance,
  duration,
  rating,
  onRequestReservation,
  onContact,
  ...props
}: ReservationResultProps) {
  return (
    <BaseContainer style={{cursor: 'pointer'}} {...props}>
      <ProfilePic src={image} />
      <ContentContainer>
        <Name>{instructorName}</Name>
        <IconLabel icon="building" color="gray500">
          {academyName}운전전문학원
        </IconLabel>
        <MultipleDescriptionContainer>
          <IconLabel icon="payments" color="gray500">
            {`${pricePerHour}원`}
          </IconLabel>
          <IconLabel icon="duration" color="gray500">
            {`${duration}시간`}
          </IconLabel>
        </MultipleDescriptionContainer>
        <MultipleDescriptionContainer>
          <IconLabel icon="building" color="gray500">
            {`${distance}km`}
          </IconLabel>
          <IconLabel icon="star" color="gray500">
            {rating}
          </IconLabel>
        </MultipleDescriptionContainer>
        <ActionsContainer>
          <Button onClick={onContact}>문의</Button>
          <Button onClick={onRequestReservation}>예약</Button>
        </ActionsContainer>
      </ContentContainer>
    </BaseContainer>
  )
}

interface StudentHistoryProps extends CardProps {
  instructorName: string
  academyName: string
  image: string
  dateStr: string
  timeStr: string
  onReviewClick?: () => void
  onCancelClick?: () => void
}

const StudentHistoryCard = forwardRef<HTMLDivElement, StudentHistoryProps>(
  function StudentHistoryCard(
    {
      instructorName,
      academyName,
      dateStr,
      timeStr,
      image,
      onReviewClick,
      onCancelClick,
      ...props
    }: StudentHistoryProps,
    ref,
  ) {
    return (
      <BaseContainer {...props} ref={ref}>
        <ProfilePic src={image} />
        <ContentContainer>
          <Name>{instructorName}</Name>
          <IconLabel icon="building" color="gray500">
            {academyName}운전전문학원
          </IconLabel>
          <MultipleDescriptionContainer>
            <Label color="gray600">{dateStr}</Label>
            <Label color="gray600">{timeStr}</Label>
          </MultipleDescriptionContainer>
          {onReviewClick && (
            <ActionsContainer>
              <Button onClick={onReviewClick}>리뷰 작성하기</Button>
            </ActionsContainer>
          )}
          {onCancelClick && (
            <ActionsContainer>
              <Button onClick={onCancelClick} bgColor="warning">
                예약 취소하기
              </Button>
            </ActionsContainer>
          )}
        </ContentContainer>
      </BaseContainer>
    )
  },
)

interface InstructorHistoryProps extends CardProps {
  studentName: string
  phoneStr: string
  dateStr: string
  timeStr: string
  image: string
  onRejectClick?: () => void
}

const InstructorHistoryCard = forwardRef<HTMLDivElement, InstructorHistoryProps>(
  function InstructorHistoryCard(
    {
      studentName,
      phoneStr,
      dateStr,
      timeStr,
      image,
      onRejectClick,
      ...props
    }: InstructorHistoryProps,
    ref,
  ) {
    return (
      <BaseContainer {...props} ref={ref}>
        <ProfilePic src={image} />
        <ContentContainer>
          <Name>{studentName}</Name>
          <IconLabel icon="call" color="gray500">
            {phoneStr}
          </IconLabel>
          <MultipleDescriptionContainer>
            <Label color="gray600">{dateStr}</Label>
            <Label color="gray600">{timeStr}</Label>
          </MultipleDescriptionContainer>
          {onRejectClick && (
            <ActionsContainer>
              <Button onClick={onRejectClick} bgColor="warning">
                거절
              </Button>
            </ActionsContainer>
          )}
        </ContentContainer>
      </BaseContainer>
    )
  },
)

function CardSkeleton() {
  return (
    <BaseContainer style={{width: '100%'}}>
      <Skeleton variant="circular" width="10rem" height="10rem" />
      <ContentContainer>
        <Skeleton style={{fontSize: '2rem'}} width="6rem" />
        <Skeleton style={{fontSize: '2rem'}} width="10rem" />
        <Skeleton style={{fontSize: '2rem'}} width="20rem" />
      </ContentContainer>
    </BaseContainer>
  )
}

export const Card = {
  InstructorHistory: InstructorHistoryCard,
  StudentHistory: StudentHistoryCard,
  ReservationResult: ReservationResultCard,
  MultipleDescriptionContainer,
  IconLabel,
  ProfilePic,
  Name,
  Label,
  Skeleton: CardSkeleton,
}
