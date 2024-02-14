# Button

## description

- 카드 컴포넌트

## props

### ReservationResultCard

|          name          |         description          |  default  |
| :--------------------: | :--------------------------: | :-------: |
|    `instructorName`    |                              |           |
|     `academyName`      |                              |           |
|     `pricePerHour`     |                              |           |
|        `image`         |       profile pic url        |           |
|       `distance`       |        distance in km        |           |
|       `duration`       |       duration by hour       |           |
|        `rating`        |                              |           |
| `onRequestReservation` |    show button if defined    | undefined |
|      `onContact`       |    show button if defined    | undefined |
|       `selected`       | highlight background if true |   false   |

### StudentHistoryCard

|       name       |         description          |  default  |
| :--------------: | :--------------------------: | :-------: |
| `instructorName` |                              |           |
|  `academyName`   |                              |           |
|     `image`      |       profile pic url        |           |
|    `dateStr`     |    formatted date string     |           |
|    `timeStr`     |    formatted time string     |           |
| `onReviewClick`  |    show button if defined    | undefined |
|    `selected`    | highlight background if true |   false   |

### InstructorHistoryCard

|       name       |          description          |  default  |
| :--------------: | :---------------------------: | :-------: |
| `instructorName` |                               |           |
|     `image`      |        profile pic url        |           |
|    `phoneStr`    | formatted phone number string |           |
|    `dateStr`     |     formatted date string     |           |
|    `timeStr`     |     formatted time string     |           |
| `onRejectClick`  |    show button if defined     | undefined |
|    `selected`    | highlight background if true  |   false   |

## use case

```tsx
<Card.ReservationResult
  instructorName="강사 이름"
  academyName="학원 이름"
  pricePerHour={10000}
  image=""
  distance={2.5}
  duration={1}
  rating={4.5}
  onContact={()=>startChat(instructorId)}
  onRequestReservation={requestReservation}
/>

<Card.StudentHistory
  instructorName="강사 이름"
  academyName="학원 이름"
  image=""
  dateStr="2024.03.01"
  timeStr="12:00~13:00 (1시간)"
  onReviewClick={showReviewForm}
/>

<Card.InstructorHistory
  studentName="학생 이름"
  phoneStr="010-0000-0000"
  dateStr="2024.03.01"
  timeStr="12:00~13:00 (1시간)"
  image=""
  onRejectClick={rejectReservation}
/>
```
