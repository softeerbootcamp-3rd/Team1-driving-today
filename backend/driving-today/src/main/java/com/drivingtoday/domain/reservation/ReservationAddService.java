package com.drivingtoday.domain.reservation;

import com.drivingtoday.domain.instructor.Instructor;
import com.drivingtoday.domain.instructor.InstructorRepository;
import com.drivingtoday.domain.instructor.exception.InstructorErrorCode;
import com.drivingtoday.domain.instructor.exception.InstructorException;
import com.drivingtoday.domain.reservation.dto.ReservationRequest;
import com.drivingtoday.domain.reservation.exception.ReservationErrorCode;
import com.drivingtoday.domain.reservation.exception.ReservationException;
import com.drivingtoday.domain.student.Student;
import com.drivingtoday.domain.student.StudentRepository;
import com.drivingtoday.domain.student.exception.StudentErrorCode;
import com.drivingtoday.domain.student.exception.StudentException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class ReservationAddService {

    private final ReservationRepository reservationRepository;
    private final StudentRepository studentRepository;
    private final InstructorRepository instructorRepository;

    @Transactional
    public Long addReservation(ReservationRequest reservationRequest, Long studentId){

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> StudentException.from(StudentErrorCode.STUDENT_NOT_EXISTS));

        Instructor instructor = instructorRepository.findById(reservationRequest.getInstructorId())
                .orElseThrow(() -> InstructorException.from(InstructorErrorCode.INSTRUCTOR_NOT_EXISTS));

        //예약하려는 시간대와 충돌하는 예약이 이미 존재하는 경우 예외 발생
        if (reservationRepository.countConfilctTimeSlot(reservationRequest.getInstructorId(),
                reservationRequest.getReservationTime(), reservationRequest.getTrainingTime(), reservationRequest.getReservationDate()) > 0) {
            throw ReservationException.from(ReservationErrorCode.RESERVATION_ALREADY_EXISTS);
        }

        Reservation reservation = reservationRequest.toReservation(instructor, student);
        reservationRepository.save(reservation);
        return reservation.getId();

    }
}

