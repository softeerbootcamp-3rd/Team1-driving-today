package com.drivingtoday.domain.reservation;

import com.drivingtoday.domain.reservation.dto.ReservationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationListService {

    private final ReservationRepository reservationRepository;

    public List<ReservationResponse> findAllReservation(Long studentId){

        List<Reservation> reservationList = reservationRepository.findAllByStudentId(studentId);
        List<ReservationResponse> reservationResponses = new ArrayList<>();

        for(Reservation reservation : reservationList){
            reservationResponses.add(ReservationResponse.builder()
                            .id(reservation.getId())
                            .reservationTime(reservation.getReservationTime())
                            .reservationDate(reservation.getReservationDate())
                            .isAccepted(reservation.getIsAccepted())
                            .trainingTime(reservation.getTrainingTime())
                            .createdAt(reservation.getCreatedAt())
                            .instructor(reservation.getInstructor())
                    .build());
        }

        return reservationResponses;
    }

    public List<ReservationResponse> findAllInstructorReservation(Long instructorId){

        List<Reservation> reservationList = reservationRepository.findAllByInstructorId(instructorId);
        List<ReservationResponse> reservationResponses = new ArrayList<>();

        for(Reservation reservation : reservationList){
            reservationResponses.add(ReservationResponse.builder()
                    .id(reservation.getId())
                    .reservationTime(reservation.getReservationTime())
                    .reservationDate(reservation.getReservationDate())
                    .isAccepted(reservation.getIsAccepted())
                    .trainingTime(reservation.getTrainingTime())
                    .createdAt(reservation.getCreatedAt())
                    .instructor(reservation.getInstructor())
                    .build());


        }

        return reservationResponses;
    }
}
