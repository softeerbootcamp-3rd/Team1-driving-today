package com.drivingtoday.domain.reservation;

import com.drivingtoday.domain.instructor.dto.InstructorDTO;
import com.drivingtoday.domain.reservation.dto.ReservationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReservationListService {

    private final ReservationRepository reservationRepository;

    public List<ReservationResponse> findAllReservation(Long studentId){

        List<Reservation> reservationList = reservationRepository.findAllByStudentId(studentId);
        List<ReservationResponse> reservationResponses = new ArrayList<>();

        reservationList.forEach(reservation -> {
            InstructorDTO instructorDTO = InstructorDTO.convertToDTO(reservation.getInstructor());

            reservationResponses.add(ReservationResponse.builder()
                    .id(reservation.getId())
                    .reservationTime(reservation.getReservationTime())
                    .reservationDate(reservation.getReservationDate())
                    .isAccepted(reservation.getIsAccepted())
                    .trainingTime(reservation.getTrainingTime())
                    .createdAt(reservation.getCreatedAt())
                    .instructorDTO(instructorDTO)
                    .build());
        });

        reservationResponses.sort(Comparator.comparing(ReservationResponse::getCreatedAt).reversed());
        return reservationResponses;

    }
}
