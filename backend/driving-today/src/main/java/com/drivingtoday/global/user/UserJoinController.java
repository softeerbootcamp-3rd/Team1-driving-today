package com.drivingtoday.global.user;

import com.drivingtoday.global.user.dto.InstructorJoinRequest;
import com.drivingtoday.global.user.dto.StudentJoinRequest;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
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
public class UserJoinController {
    private final UserJoinService userJoinService;

    @Operation(summary = "학생 회원가입 api")
    @PostMapping(value = "/student/join", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Void> studentJoin(@RequestPart("joinRequest") @Valid StudentJoinRequest joinRequest, @RequestPart( value="profileImg", required = false) MultipartFile profileImg) {
        Long newStudentId = userJoinService.addStudent(joinRequest, profileImg);
        log.info("Student ID : {} 님이 가입했습니다.", newStudentId);
        return ResponseEntity.created(URI.create("/students/" + newStudentId)).build();
    }

    @Operation(summary = "강사 회원가입 api")
    @PostMapping(value = "/instructor/join", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Void> instructorJoin(@RequestPart("joinRequest") @Valid InstructorJoinRequest joinRequest, @RequestPart( value="profileImg", required = false ) MultipartFile profileImg) {
        Long newInstructorId = userJoinService.addInstructor(joinRequest, profileImg);
        log.info("Instructor ID : {} 님이 가입했습니다.", newInstructorId);
        return ResponseEntity.created(URI.create("/instructors/" + newInstructorId)).build();
    }

}
