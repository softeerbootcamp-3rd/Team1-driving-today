package com.drivingtoday.domain.reservation.dto;

import com.drivingtoday.domain.instructor.Instructor;
import com.drivingtoday.domain.reservation.Reservation;
import com.drivingtoday.domain.student.Student;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class ReservationRequest {

    @NotNull
    private LocalDate reservationDate;

    @NotNull
    private Integer reservationTime;

    @NotNull
    private Integer trainingTime;

    @NotNull
    private Long instructorId;

    public Reservation toReservation(Instructor instructor, Student student){
        return Reservation.builder()
                .reservationDate(this.reservationDate)
                .reservationTime(this.reservationTime)
                .trainingTime(this.trainingTime)
                .instructor(instructor)
                .student(student)
                .build();

    }

}
