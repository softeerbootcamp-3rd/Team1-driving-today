package com.drivingtoday.global.user;

import com.drivingtoday.global.user.dto.InstructorRegisterRequest;
import com.drivingtoday.global.user.dto.StudentRegisterRequest;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;

@RestController
@RequiredArgsConstructor
@Slf4j
public class UserRegisterController {

    private final UserRegisterService userRegisterService;

    @Operation(summary = "[학생] 회원가입 api")
    @PostMapping(value = "/student/register", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Void> studentRegister(@RequestPart("registerRequest") StudentRegisterRequest registerRequest, @RequestPart( value="profileImg", required = false) MultipartFile profileImg) {
        Long newStudentId = userRegisterService.addStudent(registerRequest, profileImg);
        log.info("Student ID : {} 님이 가입했습니다.", newStudentId);
        return ResponseEntity.created(URI.create("/students/" + newStudentId)).build();
    }

    @Operation(summary = "[강사] 회원가입 api")
    @PostMapping(value = "/instructor/register", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Void> instructorRegister(@RequestPart("registerRequest") InstructorRegisterRequest registerRequest, @RequestPart( value="profileImg", required = false ) MultipartFile profileImg) {
        Long newInstructorId = userRegisterService.addInstructor(registerRequest, profileImg);
        log.info("Instructor ID : {} 님이 가입했습니다.", newInstructorId);
        return ResponseEntity.created(URI.create("/instructors/" + newInstructorId)).build();
    }

}
