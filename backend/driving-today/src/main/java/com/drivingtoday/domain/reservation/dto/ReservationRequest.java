package com.drivingtoday.domain.reservation.dto;


import lombok.*;

import java.time.LocalDate;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ReservationRequest {

    private LocalDate reservationDate;

    private Integer reservationTime;

    private Integer trainingTime;

    private Long instructorId;

}
