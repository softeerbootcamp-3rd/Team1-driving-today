package com.drivingtoday.domain.reservation.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum ReservationErrorCode {

    STUDENT_NOT_EXISTS("E2000",HttpStatus.NOT_FOUND, "등록자가 존재하지 않습니다."),
    INSTRUCTOR_NOT_EXISTS("E2001", HttpStatus.NOT_FOUND, "예약하려는 강사가 존재하지 않습니다."),
    RESERVATION_ALREADY_EXISTS("E2002", HttpStatus.CONFLICT, "이미 같은시간대에 예약이 존재하여 접수할 수 없습니다."),
    RESERVATION_NOT_EXISTS("E2003", HttpStatus.NOT_FOUND, "존재하지 않는 예약입니다."),
    INVALID_DELETE_REQUEST("E2004", HttpStatus.BAD_REQUEST, "요청자와 예약자가 동일하지 않습니다.");

    private String errorCode;
    private HttpStatus httpStatus;
    private String message;

}
