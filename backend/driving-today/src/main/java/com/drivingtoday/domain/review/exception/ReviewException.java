package com.drivingtoday.domain.review.exception;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
@Builder
public class ReviewException extends RuntimeException {
    private String errorCode;
    private HttpStatus httpStatus;
    private String message;

    public static ReviewException from(ReviewErrorCode errorCode) {
        return ReviewException.builder()
                .errorCode(errorCode.getErrorCode())
                .httpStatus(errorCode.getHttpStatus())
                .message(errorCode.getMessage())
                .build();
    }
}
