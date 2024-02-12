package com.drivingtoday.domain.reservation.dto;

import com.drivingtoday.domain.reservation.Reservation;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class ReservationDTO {
    private Long id;
    private Boolean isAccepted;
    private LocalDateTime createdAt;
    private LocalDate reservationDate;
    private Integer reservationTime;
    private Integer trainingTime;
    private Long studentId;
    private Long instructorId;

    public static ReservationDTO convertToDTO(Reservation reservation){
        ReservationDTO reservationDTO = new ReservationDTO();
        reservationDTO.setId(reservation.getId());
        reservationDTO.setIsAccepted(reservation.getIsAccepted());
        reservationDTO.setCreatedAt(reservation.getCreatedAt());
        reservationDTO.setReservationDate(reservation.getReservationDate());
        reservationDTO.setReservationTime(reservation.getReservationTime());
        reservationDTO.setTrainingTime(reservation.getTrainingTime());
        reservationDTO.setStudentId(reservation.getStudent().getId());
        reservationDTO.setInstructorId(reservation.getInstructor().getId());
        return reservationDTO;
    }
}