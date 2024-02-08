package com.drivingtoday.controller;


import com.drivingtoday.DTO.ReservationDTO;
import com.drivingtoday.entity.Reservation;
import com.drivingtoday.service.ReservationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService){
        this.reservationService = reservationService;
    }

    @PostMapping("/")
    @Operation(summary = "예약만들기 API")
    public ResponseEntity<?> createReservation(@RequestBody ReservationDTO reservationRequest){
        reservationService.saveReservations(reservationRequest);

        return ResponseEntity.ok().build();
    }


}
