package com.drivingtoday.global.user;

import com.drivingtoday.domain.instructor.InstructorRepository;
import com.drivingtoday.domain.student.Student;
import com.drivingtoday.domain.student.StudentRepository;
import com.drivingtoday.global.user.dto.LoginRequest;
import com.drivingtoday.global.user.dto.LoginResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserLoginService {
    private final StudentRepository studentRepository;
    private final InstructorRepository instructorRepository;

    public LoginResponse loginStudent(LoginRequest request) {
        //1. 유효한 이메일인지 확인
        Student student = studentRepository.findByEmail(request.getEmail()).orElseThrow(
                () -> new RuntimeException("존재하지 않는 이메일입니다.")
        );
        //2. 패스워드 확인
        if (!student.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("비밀번호가 틀렸습니다.");
        }
        return LoginResponse.of(student.getId());
    }
}
