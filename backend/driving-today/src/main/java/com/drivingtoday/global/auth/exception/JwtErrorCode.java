package com.drivingtoday.global.auth.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum JwtErrorCode {
    VALID_JWT_TOKEN("", HttpStatus.OK, ""),
    INVALID_JWT_SIGNATURE("E1001", HttpStatus.BAD_REQUEST, "토큰 서명이 유효하지 않습니다."),
    INVALID_JWT_TOKEN("E1002", HttpStatus.BAD_REQUEST, "유효하지 않은 토큰입니다."),
    EXPIRED_JWT_TOKEN("E1003", HttpStatus.BAD_REQUEST, "만료된 토큰입니다."),
    UNSUPPORTED_JWT_TOKEN("E1004", HttpStatus.BAD_REQUEST, "지원하지 않는 토큰입니다."),
    EMPTY_JWT("E1005", HttpStatus.BAD_REQUEST, "토큰이 없습니다.");

    private String errorCode;
    private HttpStatus httpStatus;
    private String message;
}
