package com.drivingtoday.repository;

import com.drivingtoday.entity.Instructor;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class InstructorRepositoryTest {

    @Autowired private InstructorRepository instructorRepository;

    @Test
    @DisplayName("기본 조회 테스트")
    public void test() {
        List<Instructor> availableInstructors = instructorRepository.findAvailableInstructors(
                "2024-02-08", 9, 2, 37.02, -122.13, 10, 0
        );
        assertThat(availableInstructors.size()).isEqualTo(10);
    }
}