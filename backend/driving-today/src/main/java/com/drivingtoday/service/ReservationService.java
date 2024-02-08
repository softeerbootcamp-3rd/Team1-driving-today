package com.drivingtoday.service;


import com.drivingtoday.DTO.ReservationDTO;
import com.drivingtoday.entity.Instructor;
import com.drivingtoday.entity.Reservation;
import com.drivingtoday.entity.Student;
import com.drivingtoday.repository.InstructorRepository;
import com.drivingtoday.repository.ReservationRepository;
import com.drivingtoday.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;


@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;

    private final StudentRepository studentRepository;

    private final InstructorRepository instructorRepository;

    public ReservationService(ReservationRepository reservationRepository, StudentRepository studentRepository, InstructorRepository instructorRepository){
        this.reservationRepository = reservationRepository;
        this.studentRepository = studentRepository;
        this.instructorRepository = instructorRepository;
    }

    public void saveReservations(ReservationDTO reservationDTO){

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate date = LocalDate.parse(reservationDTO.getReservationDate(), formatter);

        Optional<Student> optionalStudent = studentRepository.findById(1L);
        Student student = optionalStudent.orElseThrow(() -> new RuntimeException("Student is not present"));

        Optional<Instructor> optionalInstructor = instructorRepository.findById(reservationDTO.getInstructorId());
        Instructor instructor = optionalInstructor.orElseThrow(() -> new RuntimeException("Instructor is not present"));
        Reservation reservation = Reservation.builder()
                .reservationTime(reservationDTO.getReservationTime())
                .reservationDate(date)
                .trainingTime(reservationDTO.getTrainingTime())
                .createdAt(LocalDateTime.now())
                .status(true)
                .student(student)
                .instructor(instructor)
                .build();

        reservationRepository.save(reservation);
        return;

    }
}
