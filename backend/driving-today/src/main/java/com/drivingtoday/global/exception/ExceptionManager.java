package com.drivingtoday.global.exception;

import com.drivingtoday.domain.reservation.exception.ReservationException;
import com.drivingtoday.domain.review.exception.ReviewException;
import com.drivingtoday.global.auth.exception.JwtException;
import com.drivingtoday.global.user.exception.UserException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class ExceptionManager {
    @ExceptionHandler(UserException.class)
    public ResponseEntity<?> userExceptionHandler(UserException e) {
        log.warn("{}: {}", e.getErrorCode(), e.getMessage());
        return ResponseEntity.status(e.getHttpStatus())
                .header("Content-Type", "text/plain;charset=UTF-8")
                .body(e.getErrorCode() + ": " + e.getMessage());
    }


    @ExceptionHandler(ReviewException.class)
    public ResponseEntity<?> reviewExceptionHandler(ReviewException e) {
        log.warn("{}: {}", e.getErrorCode(), e.getMessage());
        return ResponseEntity.status(e.getHttpStatus())
                .header("Content-Type", "text/plain;charset=UTF-8")
                .body(e.getErrorCode() + ": " + e.getMessage());
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<?> ExceptionHandler(RuntimeException e) {
        log.warn("E0000: 알 수 없는 에러가 발생했습니다. - {}", e.getMessage());
        return ResponseEntity.status(500)
                .header("Content-Type", "text/plain;charset=UTF-8")
                .body("E0000: 알 수 없는 에러가 발생했습니다.");
    }

    @ExceptionHandler(ReservationException.class)
    public ResponseEntity<?> reservationExceptionHandler(ReservationException e) {
        log.warn("{}: {}", e.getErrorCode(), e.getMessage());
        return ResponseEntity.status(e.getHttpStatus())
                .header("Content-Type", "text/plain;charset=UTF-8")
                .body(e.getErrorCode() + ": " + e.getMessage());
    }

    @ExceptionHandler(JwtException.class)
    public ResponseEntity<?> jwtExceptionHandler(JwtException e){
        log.warn("{}: {}", e.getErrorCode(), e.getMessage());
        return ResponseEntity.status(e.getHttpStatus())
                .header("Content-Type", "text/plain;charset=UTF-8")
                .body(e.getErrorCode() + ": " + e.getMessage());
    }
}
