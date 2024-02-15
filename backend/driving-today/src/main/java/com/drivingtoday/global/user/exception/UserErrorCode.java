package com.drivingtoday.global.user.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum UserErrorCode {
    DUPLICATED_USER_EMAIL("E1006", HttpStatus.CONFLICT, "이미 존재하는 이메일입니다."),
    DUPLICATED_USER_NICKNAME("E1007", HttpStatus.CONFLICT, "이미 존재하는 닉네임입니다."),
    NOT_FOUND_USER_EMAIL("E1008", HttpStatus.UNAUTHORIZED, "유효하지 않은 이메일입니다."),
    INVALID_USER_PASSWORD("E1009", HttpStatus.UNAUTHORIZED, "비밀번호가 올바르지 않습니다.");

    private String errorCode;
    private HttpStatus httpStatus;
    private String message;
}
