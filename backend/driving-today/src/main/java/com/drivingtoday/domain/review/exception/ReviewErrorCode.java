package com.drivingtoday.domain.review.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum ReviewErrorCode {
    INVALID_REVIEWER("E3000", HttpStatus.UNAUTHORIZED, "예약자와 리뷰 글쓴이가 동일하지 않습니다."),
    NOT_EXIST_RESERVATION_REVIEW("E3002", HttpStatus.BAD_REQUEST, "존재하지 않는 예약입니다.");
    private String errorCode;
    private HttpStatus httpStatus;
    private String message;
}
