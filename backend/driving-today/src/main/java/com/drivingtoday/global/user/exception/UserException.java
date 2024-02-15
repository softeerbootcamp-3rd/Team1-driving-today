package com.drivingtoday.global.user.exception;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
@Builder
public class UserException extends RuntimeException{
    private String errorCode;
    private HttpStatus httpStatus;
    private String message;

    public static UserException from(UserErrorCode errorCode){
        return UserException.builder()
                .errorCode(errorCode.getErrorCode())
                .httpStatus(errorCode.getHttpStatus())
                .message(errorCode.getMessage())
                .build();
    }
}
