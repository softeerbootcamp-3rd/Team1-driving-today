package com.drivingtoday.global.user;

import com.drivingtoday.global.auth.config.JwtFilter;
import com.drivingtoday.global.auth.constants.Authentication;
import io.swagger.v3.oas.annotations.Hidden;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class TestController {
    @Hidden
    @GetMapping("/test")
    public ResponseEntity<Void> testToken(){
        Authentication authentication = JwtFilter.getAuthentication();
        log.info("Role : {}", authentication.getRole());
        log.info("Id : {}", authentication.getId());
        return ResponseEntity.ok().build();
    }
}
