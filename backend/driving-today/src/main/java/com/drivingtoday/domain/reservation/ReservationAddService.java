package com.drivingtoday.domain.reservation;


import com.drivingtoday.domain.reservation.dto.ReservationRequest;
import com.drivingtoday.domain.instructor.Instructor;
import com.drivingtoday.domain.instructor.InstructorRepository;
import com.drivingtoday.domain.reservation.exception.ReservationErrorCode;
import com.drivingtoday.domain.reservation.exception.ReservationException;
import com.drivingtoday.domain.student.Student;
import com.drivingtoday.domain.student.StudentRepository;
import com.drivingtoday.global.auth.config.JwtFilter;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class ReservationAddService {

    private final ReservationRepository reservationRepository;

    private final StudentRepository studentRepository;

    private final InstructorRepository instructorRepository;


    @Transactional
    public Long addReservation(ReservationRequest reservationRequest){

        Student student = studentRepository.findById(JwtFilter.getAuthentication().getId())
                .orElseThrow(() -> ReservationException.from(ReservationErrorCode.STUDENT_NOT_EXISTS));

        Instructor instructor = instructorRepository.findById(reservationRequest.getInstructorId())
                .orElseThrow(() -> ReservationException.from(ReservationErrorCode.INSTRUCTOR_NOT_EXISTS));

        List<Reservation> reservationList = reservationRepository.findAllByInstructorId(instructor.getId());

        for(Reservation reservation : reservationList){

            if(reservation.getReservationDate().isEqual(reservationRequest.getReservationDate())){
                int startTime = reservation.getReservationTime();
                int trainingTime = reservation.getTrainingTime();
                int requestStartTime = reservationRequest.getReservationTime();
                if(startTime <= requestStartTime && startTime+trainingTime > requestStartTime){
                    throw ReservationException.from(ReservationErrorCode.RESERVATION_ALREADY_EXISTS);
                }
            }
        }

        Reservation reservation = Reservation.builder()
                .isAccepted(true)
                .reservationTime(reservationRequest.getReservationTime())
                .reservationDate(reservationRequest.getReservationDate())
                .trainingTime(reservationRequest.getTrainingTime())
                .student(student)
                .instructor(instructor)
                .build();

        reservationRepository.save(reservation);

        return reservation.getId();

    }
}

