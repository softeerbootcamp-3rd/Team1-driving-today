package com.drivingtoday.domain.review;

import com.drivingtoday.domain.reservation.Reservation;
import com.drivingtoday.domain.reservation.ReservationRepository;
import com.drivingtoday.domain.review.dto.ReviewRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ReviewAddService {
    private final ReviewRepository reviewRepository;
    private final ReservationRepository reservationRepository;

    @Transactional
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
