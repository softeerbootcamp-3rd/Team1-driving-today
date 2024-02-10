package com.drivingtoday.domain.reservation;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationListService {

    private final ReservationRepository reservationRepository;

    public List<Reservation> findAllReservation(Long studentId){
        return reservationRepository.findAllByStudentId(studentId);
    }
}
