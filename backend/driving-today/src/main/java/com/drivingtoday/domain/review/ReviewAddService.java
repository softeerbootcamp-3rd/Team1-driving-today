package com.drivingtoday.domain.review;

import com.drivingtoday.domain.reservation.Reservation;
import com.drivingtoday.domain.reservation.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReviewAddService {
    private final ReviewRepository reviewRepository;
    private final ReservationRepository reservationRepository;

    public Long addReview(ReviewRequest reviewRequest) {
        Reservation targetReservation = reservationRepository.findById(reviewRequest.getReservationId())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 예약입니다."));

        Review review = Review.builder()
                .rating(reviewRequest.getRating())
                .contents(reviewRequest.getContents())
                .student(targetReservation.getStudent())
                .instructor(targetReservation.getInstructor())
                .build();

        reviewRepository.save(review);
        return review.getId();
    }
}
