package com.drivingtoday.domain.reservation;

import com.drivingtoday.domain.instructor.dto.InstructorDetailResponse;
import com.drivingtoday.domain.reservation.dto.ReservationDetailResponse;
import com.drivingtoday.domain.reservation.dto.ReservationInfo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReservationListService {

    private final ReservationRepository reservationRepository;

    @Transactional
    public List<ReservationDetailResponse> findAllReservation(Long studentId){

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
}
