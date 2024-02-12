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
            instructorFindService.findInstructor(13L);
        });
        assertThat("해당 강사가 존재하지 않습니다.").isEqualTo(e.getMessage());
    }

}
