package com.drivingtoday.service;

import com.drivingtoday.dto.request.AvailableInstructorsRequest;
import com.drivingtoday.entity.Instructor;
import com.drivingtoday.entity.Reservation;
import com.drivingtoday.entity.Student;
import com.drivingtoday.repository.InstructorRepository;
import com.drivingtoday.repository.ReservationRepository;
import com.drivingtoday.repository.StudentRepository;
import jakarta.transaction.Transactional;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class InstructorServiceTest {

    @Autowired private InstructorService instructorService;
    @Autowired private InstructorRepository instructorRepository;
    @Autowired private StudentRepository studentRepository;
    @Autowired private ReservationRepository reservationRepository;
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

    @Test
    @DisplayName("해당 날짜와 시간에 예약이 되어 있는 강사는 조회되면 안됨")
    public void 예약_테스트() {
        Instructor instructor1 = instructorRepository.findById(4L).get();
        Student student1 = studentRepository.findById(1L).get();

        Instructor instructor2 = instructorRepository.findById(8L).get();
        Student student2 = studentRepository.findById(2L).get();

        // 9시에 2시간 예약
        Reservation reservation1 = new Reservation(1L, true,
                LocalDateTime.now(), LocalDate.of(2024, 2, 8),
                9, 2, student1, instructor1);
        // 10시에 1시간 예약
        Reservation reservation2 = new Reservation(2L, true,
                LocalDateTime.now(), LocalDate.of(2024, 2, 8),
                10, 1, student2, instructor2);
        reservationRepository.save(reservation1);
        reservationRepository.save(reservation2);
        AvailableInstructorsRequest request = new AvailableInstructorsRequest(
                37.02, -122.13, 2, 9,
                LocalDate.of(2024, 2, 8), 1, 10);


        List<Instructor> availableInstructors = instructorService.findAvailableInstructors(request);
        assertThat(availableInstructors.size()).isEqualTo(8);

    }
}