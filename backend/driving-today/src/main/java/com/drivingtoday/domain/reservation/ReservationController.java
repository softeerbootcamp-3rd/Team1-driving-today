package com.drivingtoday.domain.reservation;


import com.drivingtoday.domain.reservation.dto.ReservationDTO;
import com.drivingtoday.domain.reservation.dto.ReservationRequest;
import com.drivingtoday.domain.reservation.dto.ReservationResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationAddService reservationAddService;

    private final ReservationListService reservationListService;

    private final ReservationDeleteService reservationDeleteService;

    @PostMapping("/reservations")
    @Operation(summary = "예약만들기 API")
    public ResponseEntity<Void> reservationAdd(@RequestBody ReservationRequest reservationRequest){
        ReservationDTO reservationDTO = reservationAddService.addReservation(reservationRequest);

        return ResponseEntity.created(URI.create("/reservation/" + reservationDTO.getId())).build();
    }

    @GetMapping("/my/reservations")
    @Operation(summary = "나의 예약리스트 확인하기 API")
    public ResponseEntity<List<ReservationResponse>> reservationList(){

        Long StudentId = 1L;
        List<ReservationResponse> contents = reservationListService.findAllReservation(StudentId);
        return ResponseEntity.ok().body(contents);
    }

    @DeleteMapping("/reservations/{reservation_id}")
    @Operation(summary = "예약 취소하기 API")
    public ResponseEntity<String> deleteReservation(@PathVariable("reservation_id") @Parameter(description = "삭제할 예약의 ID", required = true) Long reservationId) {

        return reservationDeleteService.deleteReservation(reservationId);
    }

}
