package com.drivingtoday.domain.instructor;

import com.drivingtoday.domain.academy.Academy;
import com.drivingtoday.domain.academy.AcademyRepository;
import com.drivingtoday.domain.instructor.dto.AvailableInstructorInfo;
import com.drivingtoday.domain.reservation.Reservation;
import com.drivingtoday.domain.reservation.ReservationRepository;
import com.drivingtoday.domain.student.Student;
import com.drivingtoday.domain.student.StudentRepository;
import jakarta.transaction.Transactional;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;

import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@DataJpaTest
class InstructorRepositoryTest {

    @Autowired
    private AcademyRepository academyRepository;
    @Autowired
    private InstructorRepository instructorRepository;
    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private StudentRepository studentRepository;

    @Test
    @DisplayName("예약이 없는 경우 모든 강사가 조회된다.")
    public void 모든_강사_조회_테스트() {
        // given
        for (int i = 0; i < 5; i++) {
            Instructor instructor = new Instructor();
            instructorRepository.save(instructor);
        }

        // when
        List<AvailableInstructorInfo> availableInstructors = instructorRepository.findAvailableInstructors("2024-02-29", 9, 2,
                37.22, 132.22, PageRequest.of(1, 5));

        // then
        assertThat(availableInstructors.size()).isEqualTo(5);
    }

    @Test
    @DisplayName("10명의 강사를 5명씩 2페이지로 구분")
    public void 페이징_테스트() {
        // given
        for (int i = 0; i < 10; i++) {
            Instructor instructor = new Instructor();
            instructorRepository.save(instructor);
        }

        // when
        List<AvailableInstructorInfo> availableInstructors1 = instructorRepository.findAvailableInstructors("2024-02-29", 9, 2,
                37.22, 132.22, PageRequest.of(1, 5));
        List<AvailableInstructorInfo> availableInstructors2 = instructorRepository.findAvailableInstructors("2024-02-29", 9, 2,
                37.22, 132.22, PageRequest.of(1, 5));

        // then
        assertThat(availableInstructors1.size()).isEqualTo(5);
        assertThat(availableInstructors2.size()).isEqualTo(5);
    }

    @Test
    @DisplayName("조회 날짜와 시간에 예약이 있는 강사는 목록에 표기되지 않아야 한다.")
    public void 예약_없는_강사_조회_테스트() {
        Instructor instructor1 = new Instructor();
        Instructor instructor2 = new Instructor(); // 예약된 강사들
        instructorRepository.save(instructor1);
        instructorRepository.save(instructor2);

        Student student1 = new Student();
        Student student2 = new Student();
        studentRepository.save(student1);
        studentRepository.save(student2);

        for (int i = 0; i < 8; i++) {
            Instructor instructor = new Instructor();
            instructorRepository.save(instructor);
        }

        Reservation reservation1 = new Reservation(9, 2, student1, instructor1,
                LocalDate.of(2024, 2, 29));
        Reservation reservation2 = new Reservation(9, 2, student2, instructor2,
                LocalDate.of(2024, 2, 29));

        reservationRepository.save(reservation1);
        reservationRepository.save(reservation2);

        List<AvailableInstructorInfo> availableInstructors = instructorRepository.findAvailableInstructors("2024-02-29", 9, 2,
                37.22, 132.22, PageRequest.of(1, 15));
        assertThat(availableInstructors.size()).isEqualTo(2);
    }
}