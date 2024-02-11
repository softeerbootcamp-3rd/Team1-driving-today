package com.drivingtoday.domain.instructor;

import com.drivingtoday.domain.instructor.dto.InstructorDetailResponse;
import jakarta.transaction.Transactional;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
public class InstructorFindServiceTest {

    @Autowired InstructorFindService instructorFindService;

    @Test
    @DisplayName("ID가 1인 강사의 리뷰를 조회하면 모든 리뷰(10개) 리스트가 반환된다")
    public void 기본_조회_테스트() {
        InstructorDetailResponse response = instructorFindService.findInstructor(1L, 1, 10);
        assertThat(response.getReviews().size()).isEqualTo(10);
    }

    @Test
    @DisplayName("리뷰가 하나도 없는 강사를 조회할 경우 빈 리스트가 반환된다")
    public void 리뷰없는_강사_조회_테스트() {
        InstructorDetailResponse response = instructorFindService.findInstructor(2L, 1, 1);
        assertThat(response.getReviews()).isEmpty();
    }
}
