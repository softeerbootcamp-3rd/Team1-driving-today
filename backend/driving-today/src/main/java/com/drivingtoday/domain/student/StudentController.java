package com.drivingtoday.domain.student;

import com.drivingtoday.domain.student.dto.StudentInfo;
import com.drivingtoday.global.auth.config.JwtFilter;
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

    @Operation(summary = "[강사] 학생 정보 조회 API")
    @GetMapping("/students/{student_id}")
    public ResponseEntity<StudentInfo> studentDetails(@PathVariable("student_id") Long studentId) {
        StudentInfo studentInfo = studentFindService.findStudent(studentId);
        return ResponseEntity.ok(studentInfo);
    }

    @Operation(summary = "[학생] 로그인한 학생 정보 조회 API")
    @GetMapping("/student/my")
    public ResponseEntity<StudentInfo> myDetail() {
        StudentInfo myInfo = studentFindService.findStudent(JwtFilter.getAuthentication().getId());
        return ResponseEntity.ok(myInfo);
    }
}
