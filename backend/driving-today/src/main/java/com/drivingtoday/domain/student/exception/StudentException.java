package com.drivingtoday.domain.student.exception;

import com.drivingtoday.domain.reservation.exception.ReservationErrorCode;
import com.drivingtoday.domain.reservation.exception.ReservationException;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
@Builder
public class StudentException extends RuntimeException{
    private String errorCode;
    private HttpStatus httpStatus;
    private String message;

    public static StudentException from(StudentErrorCode errorCode){
        return StudentException.builder()
                .errorCode(errorCode.getErrorCode())
                .httpStatus(errorCode.getHttpStatus())
                .message(errorCode.getMessage())
                .build();
    }
}
