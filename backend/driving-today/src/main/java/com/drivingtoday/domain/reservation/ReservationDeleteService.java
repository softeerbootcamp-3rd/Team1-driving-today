package com.drivingtoday.domain.reservation;

import com.drivingtoday.domain.instructor.Instructor;
import com.drivingtoday.domain.reservation.exception.ReservationErrorCode;
import com.drivingtoday.domain.reservation.exception.ReservationException;
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

        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> ReservationException.from(ReservationErrorCode.RESERVATION_NOT_EXISTS));
        reservationRepository.delete(reservation);
    }

}
