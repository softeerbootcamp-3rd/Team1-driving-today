package com.drivingtoday.domain.reservation;


import com.drivingtoday.domain.reservation.dto.ReservationRequest;
import com.drivingtoday.domain.instructor.Instructor;
import com.drivingtoday.domain.instructor.InstructorRepository;
import com.drivingtoday.domain.student.Student;
import com.drivingtoday.domain.student.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;


@Service
@RequiredArgsConstructor
public class ReservationAddService {

    private final ReservationRepository reservationRepository;

    private final StudentRepository studentRepository;

    private final InstructorRepository instructorRepository;

    public void addReservation(ReservationRequest reservationRequest){

        Student student = studentRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("Student is not present"));

        Instructor instructor = instructorRepository.findById(reservationRequest.getInstructorId())
                .orElseThrow(() -> new RuntimeException("Instructor is not present"));

        Reservation reservation = Reservation.builder()
                .reservationTime(reservationRequest.getReservationTime())
                .reservationDate(reservationRequest.getReservationDate())
                .trainingTime(reservationRequest.getTrainingTime())
                .createdAt(LocalDateTime.now())
                .isAccepted(true)
                .student(student)
                .instructor(instructor)
                .build();

        reservationRepository.save(reservation);
        return;

    }
}

