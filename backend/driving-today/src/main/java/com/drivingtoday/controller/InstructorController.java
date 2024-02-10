package com.drivingtoday.controller;

import com.drivingtoday.dto.request.AvailableInstructorsRequest;
import com.drivingtoday.dto.response.AvailableInstructor;
import com.drivingtoday.entity.Instructor;
import com.drivingtoday.service.InstructorService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class InstructorController {

    private final InstructorService instructorService;

    @GetMapping("/instructors")
    @Operation(summary = "예약 가능한 강사 리스트 보기 API")
    public ResponseEntity<List<AvailableInstructor>> getInstructors(@ModelAttribute AvailableInstructorsRequest request) {

        List<Instructor> instructorList = instructorService.findAvailableInstructors(request);

        List<AvailableInstructor> availableInstructors = instructorList.stream()
                .map(AvailableInstructor::from)
                .toList();

        return ResponseEntity.ok(availableInstructors);
    }
}
