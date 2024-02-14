package com.drivingtoday.global.auth.constants;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
@Builder
public class JwtException extends RuntimeException{
    private String errorCode;
    private HttpStatus httpStatus;
    private String message;

    public static JwtException from(JwtErrorCode errorCode){
        return JwtException.builder()
                .errorCode(errorCode.getErrorCode())
                .httpStatus(errorCode.getHttpStatus())
                .message(errorCode.getMessage())
                .build();
    }
}
