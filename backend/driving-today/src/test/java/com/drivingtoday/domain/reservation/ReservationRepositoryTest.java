package com.drivingtoday.domain.reservation;

import com.drivingtoday.domain.instructor.Instructor;
import com.drivingtoday.domain.instructor.InstructorRepository;
import com.drivingtoday.domain.student.Student;
import com.drivingtoday.domain.student.StudentRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@DataJpaTest
class ReservationRepositoryTest {

    @Autowired private ReservationRepository reservationRepository;
    @Autowired private InstructorRepository instructorRepository;
    @Autowired private StudentRepository studentRepository;

    @Test
    @DisplayName("특정 강사의 모든 예약을 조회한다")
    void 특정_강사_모든_예약_조회() {
        // given
        Instructor instructor1 = new Instructor();
        Instructor instructor2 = new Instructor();
        instructorRepository.save(instructor1);
        instructorRepository.save(instructor2);

        Student student = new Student();
        studentRepository.save(student);


        for(int i=0; i<9; i++) {
            Reservation reservation = Reservation.builder().instructor(instructor1).student(student).build();
            reservationRepository.save(reservation);
        }

        for(int i=0; i<7; i++) {
            Reservation reservation = Reservation.builder().instructor(instructor2).student(student).build();
            reservationRepository.save(reservation);
        }

        // when
        List<Reservation> instructor1Reservations = reservationRepository.findAllByInstructorId(1L);
        List<Reservation> instructor2Reservations = reservationRepository.findAllByInstructorId(2L);

        // then
        assertThat(instructor1Reservations.size()).isEqualTo(9);
        assertThat(instructor2Reservations.size()).isEqualTo(7);
    }

    @Test
    @DisplayName("특정 학생의 현재 이후 예약을 조회한다")
    void 특정_학생_현재_이후_예약_조회() {
        // given
        Instructor instructor = new Instructor();
        instructorRepository.save(instructor);

        Student student = new Student();
        studentRepository.save(student);

        LocalDate currentDate = LocalDate.now(); // 현재 날짜와 시간 설정
        Integer currentTime = LocalTime.now().getHour();

        // 학생과 관련된 예약 생성
        for(int i = 0; i < 4; i++) {
            Reservation reservation = Reservation.builder()
                    .student(student)
                    .instructor(instructor)
                    .reservationDate(currentDate)
                    .reservationTime(currentTime + i) // 미래 예약
                    .build();
            reservationRepository.save(reservation);
        }

        for(int i = 0; i < 3; i++) {
            Reservation reservation = Reservation.builder()
                    .student(student)
                    .instructor(instructor)
                    .reservationDate(currentDate)
                    .reservationTime(currentTime - i) // 과거 예약
                    .build();
            reservationRepository.save(reservation);
        }

        // when
//        List<Reservation> futureReservations = reservationRepository.findFutureReservationsByStudent(
//                student.getId(), currentDate, currentTime
//        );

        List<Reservation> pastReservations = reservationRepository.findPastReservationsByStudent(
                student.getId(), currentDate, currentTime
        );

//        assertThat(futureReservations.size()).isEqualTo(4);
        assertThat(pastReservations.size()).isEqualTo(3);

//        // then
//        assertThat(futureReservations).isNotEmpty();
//        for (Reservation reservation : futureReservations) {
//            assertThat(reservation.getReservationDate()).isAfterOrEqualTo(currentDate);
//            if (reservation.getReservationDate().isEqual(currentDate)) {
//                assertThat(reservation.getReservationTime()).isGreaterThan(currentTime);
//            }
//        }
    }

}