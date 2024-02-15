package com.drivingtoday.domain.reservation.exception;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
@Builder
public class ReservationException extends RuntimeException{
    private String errorCode;
    private HttpStatus httpStatus;
    private String message;

    public static ReservationException from(ReservationErrorCode errorCode){
        return ReservationException.builder()
                .errorCode(errorCode.getErrorCode())
                .httpStatus(errorCode.getHttpStatus())
                .message(errorCode.getMessage())
                .build();
    }
}
