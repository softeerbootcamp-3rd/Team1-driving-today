package com.drivingtoday.domain.review;

import com.drivingtoday.global.dto.SliceResponse;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
public class ReviewFindServiceTest {

    @Autowired
    private ReviewFindService reviewFindService;

    @Test
    @DisplayName("ID가 1인 강사의 리뷰를 조회하면 모든 리뷰(10개) 리스트가 반환된다")
    public void 기본_리뷰_조회_테스트() {
        //given
        Long instructorId = 1L;
        Integer pageNumer = 1;
        Integer pageSize = 10;

        //when
        SliceResponse<Review> reviews = reviewFindService.findReviews(1L, 1, 10);

        //then
        assertThat(reviews.getContent().size()).isEqualTo(10);
    }

    @Test
    @DisplayName("리뷰가 하나도 없는 강사를 조회할 경우 빈 리스트가 반환된다")
    public void 리뷰없는_강사_조회_테스트() {
        //given
        Long instructorId = 2L;
        Integer pageNumer = 1;
        Integer pageSize = 1;

        //when
        SliceResponse<Review> reviews = reviewFindService.findReviews(1L, 1, 10);

        //then
        assertThat(reviews.getContent()).isEmpty();
    }

    @Test
    @DisplayName("저장된 10개의 리뷰를 5개씩 2page로 나눠지는지 테스트")
    public void 페이징_테스트1() {
        //given
        Long instructorId = 1L;
        Integer pageNumber1 = 1, pageNumber2 = 2;
        Integer pageSize = 5;

        //when
        SliceResponse<Review> reviews1 = reviewFindService.findReviews(instructorId, pageNumber1, pageSize);
        SliceResponse<Review> reviews2 = reviewFindService.findReviews(instructorId, pageNumber2, pageSize);

        //then
        assertThat(reviews1.getContent().size()).isEqualTo(5);
        assertThat(reviews2.getContent().size()).isEqualTo(5);
    }

//    @Test
//    @DisplayName("저장된 10개의 리뷰를 3개씩 3page + 1개 1page로 나눠지는지 테스트")
//    public void 페이징_테스트2() {
//        //given
//        ReviewFindRequest request1 = new ReviewFindRequest(1L, 1, 3);
//        ReviewFindRequest request2 = new ReviewFindRequest(1L, 2, 3);
//        ReviewFindRequest request3 = new ReviewFindRequest(1L, 3, 3);
//        ReviewFindRequest request4 = new ReviewFindRequest(1L, 4, 3);
//
//        //when
//        List<ReviewInfo> reviews1 = reviewFindService.findReviews(request1);
//        List<ReviewInfo> reviews2 = reviewFindService.findReviews(request2);
//        List<ReviewInfo> reviews3 = reviewFindService.findReviews(request3);
//        List<ReviewInfo> reviews4 = reviewFindService.findReviews(request4);
//
//        //then
//        assertThat(reviews1.size()).isEqualTo(3);
//        assertThat(reviews2.size()).isEqualTo(3);
//        assertThat(reviews3.size()).isEqualTo(3);
//        assertThat(reviews4.size()).isEqualTo(1);
//    }

}
