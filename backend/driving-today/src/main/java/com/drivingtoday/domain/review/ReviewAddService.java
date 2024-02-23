package com.drivingtoday.domain.review;

import com.drivingtoday.domain.reservation.Reservation;
import com.drivingtoday.domain.reservation.ReservationRepository;
import com.drivingtoday.domain.reservation.exception.ReservationErrorCode;
import com.drivingtoday.domain.reservation.exception.ReservationException;
import com.drivingtoday.domain.review.dto.ReviewRequest;
import com.drivingtoday.domain.review.exception.ReviewErrorCode;
import com.drivingtoday.domain.review.exception.ReviewException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ReviewAddService {
    private final ReviewRepository reviewRepository;
    private final ReservationRepository reservationRepository;

    @Transactional
    public Long addReview(ReviewRequest reviewRequest, Long studentId) {
        Reservation reservation = reservationRepository.findById(reviewRequest.getReservationId())
                .orElseThrow(() -> ReservationException.from(ReservationErrorCode.RESERVATION_NOT_EXISTS));

        //예약자와 요청을 보낸 학생이 일치하지 않은 경우 예외 발생
        if (!reservation.getStudent().getId().equals(studentId)) {
            throw ReviewException.from(ReviewErrorCode.INVALID_REVIEWER);
        }

        Review review = reviewRequest.toReview(reservation.getStudent(), reservation.getInstructor(), reservation);
        reviewRepository.save(review);
        reservation.registerReview(review);
        return review.getId();
    }
}
