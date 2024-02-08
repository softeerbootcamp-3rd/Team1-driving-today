package com.drivingtoday.DTO;


import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ReservationDTO {

    private String reservationDate;

    private Integer reservationTime;

    private Integer trainingTime;

    private Long instructorId;

}
