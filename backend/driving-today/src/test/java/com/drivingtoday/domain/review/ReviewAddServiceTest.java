package com.drivingtoday.domain.review;

import com.drivingtoday.domain.reservation.ReservationRepository;
import com.drivingtoday.domain.review.dto.ReviewRequest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ReviewAddServiceTest {

    @Autowired
    ReservationRepository reservationRepository;

    @Autowired
    ReviewRepository reviewRepository;

    @Autowired
    ReviewAddService reviewAddService;

    @Test
    @DisplayName("존재하지 않는 예약에 대해 리뷰 작성시 런타임 에러 발생")
    @Transactional
    void 존재하지_않는_예약_리뷰남기기() {
        //given
        ReviewRequest reviewRequest = new ReviewRequest(3.5, "좋아요", 10L);
        //when: 존재하지 않는 예약
        //then
        assertThrows(RuntimeException.class, () -> {
            reviewAddService.addReview(reviewRequest);
        });
    }

    @Test
    @DisplayName("정상적인 리뷰 저장")
    @Transactional
    void 리뷰저장(){
        //given
        ReviewRequest reviewRequest = new ReviewRequest(4.3, "만족합니다.", 2L);
        //when 유효한 예약에 대한 리뷰
        Long reviewId = reviewAddService.addReview(reviewRequest);
        //then
        assertNotNull(reviewRepository.findById(reviewId));
    }
}