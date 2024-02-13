package com.drivingtoday.domain.reservation;

import com.drivingtoday.domain.reservation.dto.ReservationDetailResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationListService {

    private final ReservationRepository reservationRepository;

    @Transactional
    public List<ReservationDetailResponse> findAllStudentReservation(Long studentId){

        List<Reservation> reservationList = reservationRepository.findAllByStudentId(studentId);
        List<ReservationDetailResponse> reservationDetailResponses = new ArrayList<>();

        reservationList.forEach(reservation -> {
            reservationDetailResponses.add(ReservationDetailResponse.from(reservation));
        });

        reservationDetailResponses.sort((r1, r2) ->
                r2.getReservationInfo().getCreatedAt().compareTo(r1.getReservationInfo().getCreatedAt())
        );
        return reservationDetailResponses;
    }

    @Transactional
    public List<ReservationDetailResponse> findAllInstructorReservation(Long instructorId){

        List<Reservation> reservationList = reservationRepository.findAllByInstructorId(instructorId);
        List<ReservationDetailResponse> reservationDetailResponses = new ArrayList<>();

        reservationList.forEach(reservation -> {
            reservationDetailResponses.add(ReservationDetailResponse.from(reservation));
        });

        reservationDetailResponses.sort((r1, r2) ->
                r2.getReservationInfo().getCreatedAt().compareTo(r1.getReservationInfo().getCreatedAt())
        );
        return reservationDetailResponses;
    }


}
