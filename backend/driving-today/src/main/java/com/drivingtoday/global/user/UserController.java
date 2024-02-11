package com.drivingtoday.global.user;

import com.drivingtoday.global.user.dto.StudentJoinRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;

@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserJoinService userJoinService;

    @PostMapping(value = "/student/join", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Void> studentJoin(@ModelAttribute @Valid StudentJoinRequest joinRequest, @RequestPart(required = false) MultipartFile profileImg) {
        Long newStudentId = userJoinService.addStudent(joinRequest, profileImg);
        return ResponseEntity.created(URI.create("/students/" + newStudentId)).build();
    }

}
