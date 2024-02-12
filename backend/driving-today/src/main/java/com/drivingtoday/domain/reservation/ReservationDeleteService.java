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
    public ResponseEntity<String> deleteReservation(Long reservationId){
        try{
            Reservation reservation = reservationRepository.findById(reservationId)
                    .orElseThrow(() -> new IllegalArgumentException("reservation doesn't exists"));

            Instructor instructor = reservation.getInstructor();

            reservationRepository.delete(reservation);

            return ResponseEntity.ok("Reservation deleted Successfully");
        }catch(Exception ignored){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete reservation.");
        }
    }

}
