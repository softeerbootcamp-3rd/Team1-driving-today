package com.drivingtoday.domain.reservation.dto;

import com.drivingtoday.domain.instructor.Instructor;
import com.drivingtoday.domain.instructor.dto.InstructorDTO;
import com.drivingtoday.domain.reservation.Reservation;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@Builder
public class ReservationResponse {

    private Long id;

    private Boolean isAccepted;

    private LocalDateTime createdAt;

    private LocalDate reservationDate;

    private Integer reservationTime;

    private Integer trainingTime;

    private InstructorDTO instructorDTO;

}
