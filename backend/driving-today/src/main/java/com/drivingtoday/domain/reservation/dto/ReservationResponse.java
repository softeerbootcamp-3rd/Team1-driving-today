package com.drivingtoday.domain.reservation.dto;

import com.drivingtoday.domain.instructor.Instructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@Setter
@Getter
public class ReservationResponse {

    private Long id;

    private Boolean isAccepted;

    private LocalDateTime createdAt;

    private LocalDate reservationDate;

    private Integer reservationTime;

    private Integer trainingTime;

    private Instructor instructor;

}
