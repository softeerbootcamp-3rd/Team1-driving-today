package com.drivingtoday.controller;

import com.drivingtoday.dto.request.AvailableInstructorsRequest;
import com.drivingtoday.dto.response.AvailableInstructor;
import com.drivingtoday.entity.Instructor;
import com.drivingtoday.service.InstructorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class InstructorController {

    private final InstructorService instructorService;

    @GetMapping("/instructors")
    public ResponseEntity<List<AvailableInstructor>> getInstructors(@ModelAttribute AvailableInstructorsRequest request) {

        List<Instructor> instructorList = instructorService.findAvailableInstructors(request);

        List<AvailableInstructor> availableInstructors = instructorList.stream()
                .map(AvailableInstructor::from)
                .collect(Collectors.toList());

        return ResponseEntity.ok(availableInstructors);
    }
}
