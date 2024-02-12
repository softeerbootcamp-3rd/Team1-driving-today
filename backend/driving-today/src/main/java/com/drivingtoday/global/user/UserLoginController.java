package com.drivingtoday.global.user;

import com.drivingtoday.global.user.dto.LoginRequest;
import com.drivingtoday.global.user.dto.LoginResponse;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
public class UserLoginController {
    private final UserLoginService userLoginService;

    @Operation(summary = "학생 로그인 api")
    @PostMapping("/student/login")
    public ResponseEntity<LoginResponse> studentLogin(@RequestBody @Valid LoginRequest request){
        LoginResponse response = userLoginService.loginStudent(request);
        log.info("Student ID : {} 님이 로그인했습니다.", response.getId());
        return ResponseEntity.ok(response);
    }
}
