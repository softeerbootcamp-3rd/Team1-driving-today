package com.drivingtoday.domain.reservation;

import com.drivingtoday.domain.reservation.dto.ReservationInstructorResponse;
import com.drivingtoday.domain.reservation.dto.ReservationRequest;
import com.drivingtoday.domain.reservation.dto.ReservationStudentResponse;
import com.drivingtoday.global.auth.config.JwtFilter;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationListService reservationListService;
    private final ReservationDeleteService reservationDeleteService;
    private final ReservationLockFacade reservationLockFacade;

    @Operation(summary = "예약만들기 API")
    @PostMapping("/student/reservations")
    public ResponseEntity<Void> reservationAdd(@RequestBody ReservationRequest reservationRequest) {
        Long studentId = JwtFilter.getAuthentication().getId();
        Long newReservationId = reservationLockFacade.addReservation(reservationRequest, studentId);
        return ResponseEntity.created(URI.create("/reservation/" + newReservationId)).build();
    }

    @Operation(summary = "학생이 본인 예약리스트 확인하기 API")
    @GetMapping("/student/reservations")
    public ResponseEntity<List<ReservationStudentResponse>> reservationList(@RequestParam("isUpcoming") Boolean isUpcoming) {
        Long studentId = JwtFilter.getAuthentication().getId();
        List<ReservationStudentResponse> allStudentReservation =
                reservationListService.findAllStudentReservation(studentId, isUpcoming);
        return ResponseEntity.ok(allStudentReservation);
    }


    @Operation(summary = "강사가 본인 예약리스트 확인하기 API")
    @GetMapping("/instructor/reservations")
    public ResponseEntity<List<ReservationInstructorResponse>> instructorReservationList(@RequestParam("pageNumber") Integer pageNumber,
                                                                                         @RequestParam("pageSize") Integer pageSize,
                                                                                         @RequestParam("isUpcoming") Boolean isUpcoming) {
        Long studentId = JwtFilter.getAuthentication().getId();
        List<ReservationInstructorResponse> allInstructorReservation =
                reservationListService.findAllInstructorReservation(studentId, pageNumber, pageSize, isUpcoming);
        return ResponseEntity.ok(allInstructorReservation);
    }

    @Operation(summary = "학생이 예약 취소하기 API")
    @DeleteMapping("/student/reservations/{reservation_id}")
    public ResponseEntity<Void> cancelStudentReservation(@PathVariable("reservation_id") Long reservationId) {
        reservationDeleteService.cancelStudentReservation(reservationId, JwtFilter.getAuthentication().getId());
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "강사가 예약 거절하기 API")
    @DeleteMapping("/instructor/reservations/{reservation_id}")
    public ResponseEntity<Void> rejectInstructorReservation(@PathVariable("reservation_id") Long reservationId) {
        reservationDeleteService.rejectInstructorReservation(reservationId, JwtFilter.getAuthentication().getId());
        return ResponseEntity.ok().build();
    }

}
