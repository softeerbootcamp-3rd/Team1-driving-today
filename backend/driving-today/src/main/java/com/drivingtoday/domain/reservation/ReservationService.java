package com.drivingtoday.domain.reservation;


import com.drivingtoday.domain.reservation.dto.ReservationRequest;
import com.drivingtoday.domain.instructor.Instructor;
import com.drivingtoday.domain.instructor.InstructorRepository;
import com.drivingtoday.domain.student.Student;
import com.drivingtoday.domain.student.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;

    private final StudentRepository studentRepository;

    private final InstructorRepository instructorRepository;

    public void saveReservations(ReservationRequest reservationRequest){

        Optional<Student> optionalStudent = studentRepository.findById(1L);
        Student student = optionalStudent.orElseThrow(() -> new RuntimeException("Student is not present"));

        Optional<Instructor> optionalInstructor = instructorRepository.findById(reservationRequest.getInstructorId());
        Instructor instructor = optionalInstructor.orElseThrow(() -> new RuntimeException("Instructor is not present"));
        Reservation reservation = Reservation.builder()
                .reservationTime(reservationRequest.getReservationTime())
                .reservationDate(reservationRequest.getReservationDate())
                .trainingTime(reservationRequest.getTrainingTime())
                .createdAt(LocalDateTime.now())
                .status(true)
                .student(student)
                .instructor(instructor)
                .build();

        reservationRepository.save(reservation);
        return;

    }
}
