package com.drivingtoday.domain.instructor;

import com.drivingtoday.domain.instructor.dto.InstructorDetailResponse;
import com.drivingtoday.domain.review.Review;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class InstructorController {
    private final InstructorFindService instructorFindService;

    @GetMapping("/instructors/{instructor_id}")
    @Operation(summary = "강사 상세 정보 반환하는 API")
    public ResponseEntity<InstructorDetailResponse> instructorDetails(@PathVariable("instructor_id") Long instructorId,
                                                                      @RequestParam("pageNumber") Integer pageNumber,
                                                                      @RequestParam("pageSize") Integer pageSize) {
        InstructorDetailResponse response =
                instructorFindService.findInstructor(instructorId, pageNumber, pageSize);
        return ResponseEntity.ok(response);
    }
}
