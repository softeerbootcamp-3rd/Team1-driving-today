package com.drivingtoday.domain.reservation.dto;

import com.drivingtoday.domain.reservation.Reservation;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class ReservationInstructorResponse {
    private Long reservationId;
    private String studentImage;
    private String studentName;
    private String phoneNumber;
    private LocalDate reservationDate;
    private Integer reservationTime;
    private Integer trainingTime;

    public static ReservationInstructorResponse from(Reservation reservation) {
        return ReservationInstructorResponse.builder()
                .reservationId(reservation.getId())
                .studentImage(reservation.getStudent().getStudentImage())
                .studentName(reservation.getStudent().getName())
                .phoneNumber(reservation.getStudent().getPhoneNumber())
                .reservationDate(reservation.getReservationDate())
                .reservationTime(reservation.getReservationTime())
                .trainingTime(reservation.getTrainingTime())
                .build();
    }
}
