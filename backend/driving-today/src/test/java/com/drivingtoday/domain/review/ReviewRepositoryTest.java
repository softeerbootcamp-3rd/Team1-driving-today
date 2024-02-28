package com.drivingtoday.domain.review;

import com.drivingtoday.domain.instructor.Instructor;
import com.drivingtoday.domain.instructor.InstructorRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@DataJpaTest
public class ReviewRepositoryTest {

    @Autowired private ReviewRepository reviewRepository;
    @Autowired private InstructorRepository instructorRepository;

    @Test
    @DisplayName("특정 강사 리뷰 평점 조회 테스트")
    public void 리뷰_평점_조회() {
        // given
        Instructor instructor = new Instructor();
        Review review1 = Review.builder().rating(4.0).instructor(instructor).build();
        Review review2 = Review.builder().rating(5.0).instructor(instructor).build();
        instructorRepository.save(instructor);
        reviewRepository.save(review1);
        reviewRepository.save(review2);

        // when
        Double avgRating = reviewRepository.findAverageRatingByInstructorId(1L);

        // then
        Assertions.assertThat(avgRating).isEqualTo(4.5);
    }

}
