package com.drivingtoday.domain.reservation;

import com.drivingtoday.domain.instructor.Instructor;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.beans.Transient;

@Service
@RequiredArgsConstructor
public class ReservationDeleteService {

    private final ReservationRepository reservationRepository;

    @Transactional
    public void deleteReservation(Long reservationId){

        Reservation reservation = reservationRepository.findById(reservationId).orElseThrow(() -> new RuntimeException("reservation doesn't exists"));

        reservationRepository.delete(reservation);

        return;
    }

}
