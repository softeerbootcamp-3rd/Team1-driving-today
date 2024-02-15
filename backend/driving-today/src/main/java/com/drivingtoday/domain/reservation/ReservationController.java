package com.drivingtoday.domain.reservation;


import com.drivingtoday.domain.reservation.dto.ReservationInstructorResponse;
import com.drivingtoday.domain.reservation.dto.ReservationRequest;
import com.drivingtoday.domain.reservation.dto.ReservationStudentResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
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
        Long newReservationId = reservationAddService.addReservation(reservationRequest);
        return ResponseEntity.created(URI.create("/reservation/" + newReservationId)).build();
    }

    @GetMapping("/my/reservations")
    @Operation(summary = "나의 예약리스트 확인하기 API")
    public ResponseEntity<List<ReservationStudentResponse>> reservationList(@RequestParam("pageNumber") Integer pageNumber,
                                                                           @RequestParam("pageSize") Integer pageSize){
        Long StudentId = 1L;
        List<ReservationStudentResponse> allStudentReservation = reservationListService.findAllStudentReservation(StudentId, pageNumber, pageSize);
        return ResponseEntity.ok(allStudentReservation);
    }


    @Operation(summary = "강사가 본인 예약리스트 확인하기 API")
    @GetMapping("/reservations")
    public ResponseEntity<List<ReservationInstructorResponse>> instructorReservationList(@RequestParam("pageNumber") Integer pageNumber,
                                                                                         @RequestParam("pageSize") Integer pageSize){
        Long InstructorId = 1L;
        List<ReservationInstructorResponse> allInstructorReservation = reservationListService.findAllInstructorReservation(InstructorId, pageNumber, pageSize);
        return ResponseEntity.ok(allInstructorReservation);
    }

    @DeleteMapping("/reservations/{reservation_id}")
    @Operation(summary = "예약 취소하기 API")
    public ResponseEntity<Void> deleteReservation(@PathVariable("reservation_id") @Parameter(description = "삭제할 예약의 ID", required = true) Long reservationId) {
        reservationDeleteService.deleteReservation(reservationId);
        return ResponseEntity.ok().build();
    }

}
