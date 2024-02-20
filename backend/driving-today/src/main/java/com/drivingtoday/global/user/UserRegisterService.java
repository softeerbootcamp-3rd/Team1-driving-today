package com.drivingtoday.global.user;

import com.drivingtoday.domain.academy.Academy;
import com.drivingtoday.domain.academy.AcademyRepository;
import com.drivingtoday.domain.instructor.Instructor;
import com.drivingtoday.domain.instructor.InstructorRepository;
import com.drivingtoday.domain.student.Student;
import com.drivingtoday.domain.student.StudentRepository;
import com.drivingtoday.global.s3.S3UploadService;
import com.drivingtoday.global.user.dto.InstructorRegisterRequest;
import com.drivingtoday.global.user.dto.StudentRegisterRequest;
import com.drivingtoday.global.user.exception.UserErrorCode;
import com.drivingtoday.global.user.exception.UserException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class UserRegisterService {
    private final S3UploadService s3UploadService;
    private final StudentRepository studentRepository;
    private final InstructorRepository instructorRepository;
    private final AcademyRepository academyRepository;

    public Long addStudent(StudentRegisterRequest registerRequest, MultipartFile profileImg) {

        //이미 존재하는 이메일일 경우 예외 발생
        if(studentRepository.findByEmail(registerRequest.getEmail()).isPresent()){
            throw UserException.from(UserErrorCode.DUPLICATED_USER_EMAIL);
        }

        //이미 존재하는 닉네임일 경우 예외 발생
        if (studentRepository.findByNickname(registerRequest.getNickname()).isPresent()) {
            throw UserException.from(UserErrorCode.DUPLICATED_USER_NICKNAME);
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
        Student newStudent = registerRequest.toStudent(imgUrl);
        studentRepository.save(newStudent);
        return newStudent.getId();
    }

    public Long addInstructor(InstructorRegisterRequest registerRequest, MultipartFile profileImg) {

        //이미 존재하는 이메일일 경우 예외 발생
        if(instructorRepository.findByEmail(registerRequest.getEmail()).isPresent()){
            throw UserException.from(UserErrorCode.DUPLICATED_USER_EMAIL);
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
        //데이터베이스에 강사 저장
        Academy academy = academyRepository.findById(registerRequest.getAcademyId()).orElseThrow(() -> new RuntimeException("존재하지 않는 학원입니다."));
        Instructor instructor = registerRequest.toInstructor(academy, imgUrl);
        instructorRepository.save(instructor);
        return instructor.getId();
    }
}
