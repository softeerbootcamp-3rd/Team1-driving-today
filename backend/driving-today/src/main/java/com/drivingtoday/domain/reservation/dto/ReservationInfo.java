package com.drivingtoday.domain.reservation.dto;

import com.drivingtoday.domain.reservation.Reservation;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Builder
public class ReservationInfo {

    private Long id;
    private Boolean isAccepted;
    private LocalDateTime createdAt;
    private LocalDate reservationDate;
    private Integer reservationTime;
    private Integer trainingTime;

    public static ReservationInfo from(Reservation reservation){
        return ReservationInfo.builder()
                .id(reservation.getId())
                .isAccepted(reservation.getIsAccepted())
                .createdAt(reservation.getCreatedAt())
                .reservationDate(reservation.getReservationDate())
                .reservationTime(reservation.getReservationTime())
                .trainingTime(reservation.getTrainingTime())
                .build();
    }


}
