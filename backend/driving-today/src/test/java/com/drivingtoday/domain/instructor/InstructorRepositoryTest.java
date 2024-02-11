package com.drivingtoday.domain.instructor;

import jakarta.transaction.Transactional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
class InstructorRepositoryTest {

    @Autowired private InstructorRepository instructorRepository;

    @Test
    @DisplayName("기본 조회 테스트")
    public void test() {
        List<Instructor> availableInstructors = instructorRepository.findAvailableInstructors(
                "2024-02-08", 9, 2, 37.02, -122.13, PageRequest.of(0, 10)
        );
        assertThat(availableInstructors.size()).isEqualTo(10);
    }
}