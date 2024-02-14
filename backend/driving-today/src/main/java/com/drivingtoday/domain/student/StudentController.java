package com.drivingtoday.domain.student;

import com.drivingtoday.domain.student.dto.StudentInfo;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class StudentController {

    private final StudentFindService studentFindService;

    @Operation(summary = "강사 화면에서 학생 정보 조회 API")
    @GetMapping("/students/{student_id}")
    public ResponseEntity<StudentInfo> studentDetails(@PathVariable("student_id") Long studentId) {
        StudentInfo studentInfo = studentFindService.findStudent(studentId);
        return ResponseEntity.ok(studentInfo);
    }
}