package com.drivingtoday.global.user;

import com.drivingtoday.global.user.dto.StudentJoinRequest;
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

    @PostMapping(value = "/student/join", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Void> studentJoin(@RequestPart @Valid StudentJoinRequest joinRequest, @RequestPart(required = false) MultipartFile profileImg) {
        Long newStudentId = userJoinService.addStudent(joinRequest, profileImg);
        log.info("Student ID : {} 님이 가입했습니다.", newStudentId);
        return ResponseEntity.created(URI.create("/students/" + newStudentId)).build();
    }

}
