package com.drivingtoday.DTO;


import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ReservationDTO {

    private Boolean status;

    private String reservationDate;

    private Integer reservationTime;

    private Integer trainingTime;

    private Long studentId;

    private Long instructorId;

}
