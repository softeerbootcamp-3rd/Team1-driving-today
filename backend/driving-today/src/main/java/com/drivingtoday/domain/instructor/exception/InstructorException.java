package com.drivingtoday.domain.instructor.exception;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
@Builder
public class InstructorException extends RuntimeException {
    private String errorCode;
    private HttpStatus httpStatus;
    private String message;

    public static InstructorException from(InstructorErrorCode errorCode) {
        return InstructorException.builder()
                .errorCode(errorCode.getErrorCode())
                .httpStatus(errorCode.getHttpStatus())
                .message(errorCode.getMessage())
                .build();
    }
}
