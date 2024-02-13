package com.drivingtoday.domain.reservation;

import com.drivingtoday.domain.reservation.dto.ReservationDetailResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationListService {

    private final ReservationRepository reservationRepository;

    @Transactional
    public List<ReservationDetailResponse> findAllStudentReservation(Long studentId, Integer pageNumber, Integer pageSize){

        List<Reservation> reservationList = reservationRepository.findAllByStudentId(studentId,
                PageRequest.of(pageNumber - 1, pageSize, Sort.by("createdAt").descending())).getContent();
        List<ReservationDetailResponse> reservationDetailResponses = new ArrayList<>();

        reservationList.forEach(reservation -> {
            reservationDetailResponses.add(ReservationDetailResponse.from(reservation));
        });

        return reservationDetailResponses;
    }

    @Transactional
    public List<ReservationDetailResponse> findAllInstructorReservation(Long instructorId, Integer pageNumber, Integer pageSize){

        List<Reservation> reservationList = reservationRepository.findAllByInstructorId(instructorId,
                PageRequest.of(pageNumber - 1, pageSize, Sort.by("createdAt").descending())).getContent();
        List<ReservationDetailResponse> reservationDetailResponses = new ArrayList<>();

        reservationList.forEach(reservation -> {
            reservationDetailResponses.add(ReservationDetailResponse.from(reservation));
        });

        return reservationDetailResponses;
    }


}
