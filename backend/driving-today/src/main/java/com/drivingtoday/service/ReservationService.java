package com.drivingtoday.service;


import com.drivingtoday.DTO.ReservationDTO;
import com.drivingtoday.entity.Reservation;
import com.drivingtoday.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;

    public ReservationService(ReservationRepository reservationRepository){
        this.reservationRepository = reservationRepository;
    }

    public void saveReservations(ReservationDTO reservationDTO){



    }
}
