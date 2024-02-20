package com.drivingtoday.domain.student.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum StudentErrorCode {
    STUDENT_NOT_EXISTS("E5001", HttpStatus.NOT_FOUND, "해당 학생이 존재하지 않습니다.");

    private String errorCode;
    private HttpStatus httpStatus;
    private String message;
}
