package com.drivingtoday.domain.academy;

import com.drivingtoday.domain.academy.dto.AcademySearchResponse;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class AcademyController {

    private final AcademyFindService academyFindService;

    @Operation(summary = "[강사] 학원 이름 검색")
    @GetMapping("/academies")
    public ResponseEntity<List<AcademySearchResponse>> academySearch(@RequestParam("name") String name) {
        return ResponseEntity.ok(academyFindService.findAcademies(name));
    }
}
