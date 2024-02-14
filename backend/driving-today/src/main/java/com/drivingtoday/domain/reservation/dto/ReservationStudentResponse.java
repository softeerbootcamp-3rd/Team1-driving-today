package com.drivingtoday.domain.reservation.dto;

import com.drivingtoday.domain.reservation.Reservation;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class ReservationStudentResponse {
    private Long reservationId;
    private String instructorImage;
    private String instructorName;
    private String academyName;
    private LocalDate reservationDate;
    private Integer reservationTime;
    private Integer trainingTime;
    private Long instructorId;

    public static ReservationStudentResponse from(Reservation reservation) {
        return ReservationStudentResponse.builder()
                .reservationId(reservation.getId())
                .instructorImage(reservation.getInstructor().getInstructorImage())
                .instructorName(reservation.getInstructor().getName())
                .academyName(reservation.getInstructor().getAcademy().getName())
                .reservationDate(reservation.getReservationDate())
                .reservationTime(reservation.getReservationTime())
                .trainingTime(reservation.getTrainingTime())
                .instructorId(reservation.getInstructor().getId())
                .build();
    }
}
