package com.drivingtoday.domain.instructor.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum InstructorErrorCode {
    INSTRUCTOR_NOT_EXISTS("E2001", HttpStatus.NOT_FOUND, "해당 강사가 존재하지 않습니다.");
    private String errorCode;
    private HttpStatus httpStatus;
    private String message;
}
