package com.drivingtoday.domain.instructor;

import com.drivingtoday.domain.instructor.dto.InstructorDetailResponse;
import com.drivingtoday.domain.instructor.dto.AvailableInstructorsRequest;
import com.drivingtoday.domain.instructor.dto.AvailableInstructorInfo;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
@RequiredArgsConstructor
public class InstructorController {
    private final InstructorFindService instructorFindService;

    @Operation(summary = "[학생] 강사 상세 정보 반환하는 API")
    @GetMapping("/instructors/{instructor_id}")
    public ResponseEntity<InstructorDetailResponse> instructorDetails(@PathVariable("instructor_id") Long instructorId) {
        InstructorDetailResponse response = instructorFindService.findInstructor(instructorId);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "[학생] 예약 가능한 강사 리스트 보기 API")
    @GetMapping("/instructors")
    public ResponseEntity<List<AvailableInstructorInfo>> instructorList(@ModelAttribute @Valid AvailableInstructorsRequest request) {

        List<AvailableInstructorInfo> availableInstructors =
                instructorFindService.findAvailableInstructors(request);
        return ResponseEntity.ok(availableInstructors);
    }
}
