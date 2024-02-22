package com.drivingtoday.global.config;

import io.swagger.v3.oas.annotations.Hidden;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheckController {
    @Hidden
    @GetMapping("/health")
    public ResponseEntity<Void> checkHealth(){
        return ResponseEntity.ok().build();
    }
}
