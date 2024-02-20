package com.drivingtoday.domain.instructor;

import com.drivingtoday.domain.instructor.dto.AvailableInstructorInfo;
import com.drivingtoday.domain.instructor.dto.InstructorDetailResponse;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
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
    public ResponseEntity<List<AvailableInstructorInfo>> instructorList(@RequestParam("latitude") Double latitude,
                                                                        @RequestParam("longitude") Double longitude,
                                                                        @RequestParam("reservationDate") LocalDate reservationDate,
                                                                        @RequestParam("reservationTime") Integer reservationTime,
                                                                        @RequestParam("trainingTime") Integer trainingTime,
                                                                        @RequestParam("pageNumber") Integer pageNumber,
                                                                        @RequestParam("pageSize") Integer pageSize) {

        List<AvailableInstructorInfo> availableInstructors =
                instructorFindService.findAvailableInstructors(latitude, longitude, reservationDate, reservationTime, trainingTime, pageNumber, pageSize);
        return ResponseEntity.ok(availableInstructors);
    }
}
