package com.drivingtoday.domain.review;

import com.drivingtoday.domain.reservation.ReservationRepository;
import com.drivingtoday.domain.review.dto.ReviewRequest;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
class ReviewAddServiceTest {

    @Autowired
    ReservationRepository reservationRepository;

    @Autowired
    ReviewAddService reviewAddService;

    @Test
    @DisplayName("존재하지 않는 예약에 대해 리뷰 작성시 런타임 에러 발생")
    @Transactional
    void 존재하지_않는_예약_리뷰남기기() {
        //given
        ReviewRequest reviewRequest = new ReviewRequest(3.5, "좋아요", 1L);
        //when: 존재하지 않는 예약
        //then
        assertThrows(RuntimeException.class, () -> {
            reviewAddService.addReview(reviewRequest);
        });
    }

}