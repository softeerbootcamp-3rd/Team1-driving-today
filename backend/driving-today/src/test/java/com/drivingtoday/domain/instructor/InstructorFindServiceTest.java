package com.drivingtoday.domain.instructor;

import com.drivingtoday.domain.instructor.dto.InstructorDetailResponse;
import jakarta.transaction.Transactional;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@Transactional
public class InstructorFindServiceTest {

    @Autowired InstructorFindService instructorFindService;

    @Test
    @DisplayName("존재하지 않는 강사id로 조회된 경우 예외 발생")
    public void 없는_강사_조회_테스트() {
        RuntimeException e = assertThrows(RuntimeException.class, () -> {
            instructorFindService.findInstructor(13L, 1, 5);
        });
        assertThat("해당 강사가 존재하지 않습니다.").isEqualTo(e.getMessage());
    }

    @Test
    @DisplayName("ID가 1인 강사의 리뷰를 조회하면 모든 리뷰(10개) 리스트가 반환된다")
    public void 기본_리뷰_조회_테스트() {
        InstructorDetailResponse response = instructorFindService.findInstructor(1L, 1, 10);
        assertThat(response.getReviews().size()).isEqualTo(10);
    }

    @Test
    @DisplayName("리뷰가 하나도 없는 강사를 조회할 경우 빈 리스트가 반환된다")
    public void 리뷰없는_강사_조회_테스트() {
        InstructorDetailResponse response = instructorFindService.findInstructor(2L, 1, 1);
        assertThat(response.getReviews()).isEmpty();
    }

    @Test
    @DisplayName("저장된 10개의 리뷰를 5개씩 2page로 나눠지는지 테스트")
    public void 페이징_테스트1() {
        InstructorDetailResponse response1 = instructorFindService.findInstructor(1L, 1, 5);
        assertThat(response1.getReviews().size()).isEqualTo(5);

        InstructorDetailResponse response2 = instructorFindService.findInstructor(1L, 2, 5);
        assertThat(response2.getReviews().size()).isEqualTo(5);
    }

    @Test
    @DisplayName("저장된 10개의 리뷰를 3개씩 3page + 1개 1page로 나눠지는지 테스트")
    public void 페이징_테스트2() {
        InstructorDetailResponse response1 = instructorFindService.findInstructor(1L, 1, 3);
        assertThat(response1.getReviews().size()).isEqualTo(3);

        InstructorDetailResponse response2 = instructorFindService.findInstructor(1L, 2, 3);
        assertThat(response2.getReviews().size()).isEqualTo(3);

        InstructorDetailResponse response3 = instructorFindService.findInstructor(1L, 3, 3);
        assertThat(response3.getReviews().size()).isEqualTo(3);

        InstructorDetailResponse response4 = instructorFindService.findInstructor(1L, 4, 3);
        assertThat(response4.getReviews().size()).isEqualTo(1);
    }
}
