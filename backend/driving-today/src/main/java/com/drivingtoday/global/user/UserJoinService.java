package com.drivingtoday.global.user;

import com.drivingtoday.domain.student.Student;
import com.drivingtoday.domain.student.StudentRepository;
import com.drivingtoday.global.s3.S3UploadService;
import com.drivingtoday.global.user.dto.StudentJoinRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class UserJoinService {
    private final S3UploadService s3UploadService;
    private final StudentRepository studentRepository;

    public Long addStudent(StudentJoinRequest joinRequest, MultipartFile profileImg) {

        //이미 존재하는 닉네임일 경우 예외 발생
        if (studentRepository.findByNickname(joinRequest.getNickname()).isPresent()) {
            throw new RuntimeException("이미 존재하는 닉네임입니다.");
        }

        //프로필 이미지 업로드
        String imgUrl = "";
        try {
            if (profileImg != null) {
                imgUrl = s3UploadService.uploadFile(profileImg, "profile/");
            }
        } catch (IOException e) {
            throw new RuntimeException("S3 upload Fail");
        }

        //데이터베이스에 학생 저장
        Student newStudent = joinRequest.toStudent(imgUrl);
        studentRepository.save(newStudent);
        return newStudent.getId();
    }

}
