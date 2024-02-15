package com.drivingtoday.global.exception;

import com.drivingtoday.global.user.exception.UserException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class ExceptionManager {
    @ExceptionHandler(UserException.class)
    public ResponseEntity<?> userExceptionHandler(UserException e){
        log.warn("{}: {}", e.getErrorCode(), e.getMessage());
        return ResponseEntity.status(e.getHttpStatus())
                .body(e.getErrorCode()+": "+e.getMessage());
    }
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<?> jwtExceptionHandler(RuntimeException e){
        log.warn("E0000: 알 수 없는 에러가 발생했습니다. - {}", e.getMessage());
        return ResponseEntity.status(500)
                .body("E0000: 알 수 없는 에러가 발생했습니다.");
    }
}
