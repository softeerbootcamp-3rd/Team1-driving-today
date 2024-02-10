package com.drivingtoday.DTO;


import lombok.*;

import java.time.LocalDate;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ReservationDTO {

    private LocalDate reservationDate;

    private Integer reservationTime;

    private Integer trainingTime;

    private Long instructorId;

}
