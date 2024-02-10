package com.drivingtoday.service;

import com.drivingtoday.dto.request.AvailableInstructorsRequest;
import com.drivingtoday.entity.Instructor;
import jakarta.transaction.Transactional;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class InstructorServiceTest {

    @Autowired
    private InstructorService instructorService;
    @Test
    @DisplayName("기본 조회 테스트")
    public void 기본_조회() {
        AvailableInstructorsRequest request = new AvailableInstructorsRequest(
                37.02, -122.13, 2, 9,
                LocalDate.of(2024, 2, 8), 1, 10);

        List<Instructor> availableInstructors = instructorService.findAvailableInstructors(request);
        assertThat(availableInstructors.size()).isEqualTo(10);
    }

    @Test
    @DisplayName("2페이지에서 5개의 강사 리스트를 가져오기")
    public void 페이징_테스트() {
        AvailableInstructorsRequest request = new AvailableInstructorsRequest(
                37.02, -122.13, 2, 9,
                LocalDate.of(2024, 2, 8), 2, 5);
        List<Instructor> availableInstructors = instructorService.findAvailableInstructors(request);
        assertThat(availableInstructors.size()).isEqualTo(5);
    }
}