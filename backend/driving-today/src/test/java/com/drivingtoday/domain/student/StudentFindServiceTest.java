package com.drivingtoday.domain.student;

import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class StudentFindServiceTest {

    @Autowired StudentFindService studentFindService;
    @Test
    @DisplayName("조회하는 학생id에 대한 학생이 없으면 예외가 발생한다")
    public void 없는_학생id_조회_테스트() {
        Long studentId = 12L;

        RuntimeException e = assertThrows(RuntimeException.class, () -> studentFindService.findStudent(studentId));
        assertThat("해당 학생이 존재하지 않습니다.").isEqualTo(e.getMessage());
    }
}