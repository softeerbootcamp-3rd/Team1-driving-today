package com.drivingtoday.domain.reservation.dto;

import com.drivingtoday.domain.reservation.Reservation;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Builder
public class ReservationInstructorResponse {
    private Long reservationId;
    private String studentImage;
    private String studentName;
    private String phoneNumber;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate reservationDate;
    private Integer reservationTime;
    private Integer trainingTime;
    private Long studentId;
    private Boolean isUpcoming;

    public static ReservationInstructorResponse from(Reservation reservation) {
        return ReservationInstructorResponse.builder()
                .reservationId(reservation.getId())
                .studentImage(reservation.getStudent().getStudentImage())
                .studentName(reservation.getStudent().getName())
                .phoneNumber(reservation.getStudent().getPhoneNumber())
                .reservationDate(reservation.getReservationDate())
                .reservationTime(reservation.getReservationTime())
                .trainingTime(reservation.getTrainingTime())
                .studentId(reservation.getStudent().getId())
                .isUpcoming(isReservationUpcoming(reservation))
                .build();
    }

    private static Boolean isReservationUpcoming(Reservation reservation) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime reservationDateTime = LocalDateTime.of(reservation.getReservationDate(),
                        LocalTime.of(reservation.getReservationTime(), 0));
        return reservationDateTime.isAfter(now);
    }
}
