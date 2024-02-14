package com.drivingtoday.global.user;

import com.drivingtoday.domain.instructor.Instructor;
import com.drivingtoday.domain.instructor.InstructorRepository;
import com.drivingtoday.domain.student.Student;
import com.drivingtoday.domain.student.StudentRepository;
import com.drivingtoday.global.auth.constants.Role;
import com.drivingtoday.global.auth.jwt.Jwt;
import com.drivingtoday.global.auth.jwt.JwtProvider;
import com.drivingtoday.global.user.dto.LoginRequest;
import com.drivingtoday.global.user.dto.LoginResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserLoginService {
    private final JwtProvider jwtProvider;
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
        //3. 토큰 생성
        Map<String, Object> claims = new HashMap<>();
        claims.put(JwtProvider.CLAIM_USERID, student.getId());
        claims.put(JwtProvider.CLAIM_ROLE, Role.STUDENT);
        Jwt jwt = jwtProvider.createJwt(claims);
        return LoginResponse.of(student.getId(), jwt);
    }

    public LoginResponse loginInstructor(LoginRequest request) {
        //1. 유효한 이메일인지 확인
        Instructor instructor = instructorRepository.findByEmail(request.getEmail()).orElseThrow(
                () -> new RuntimeException("존재하지 않는 이메일입니다.")
        );
        //2. 패스워드 확인
        if (!instructor.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("비밀번호가 틀렸습니다.");
        }
        //3. 토큰 생성
        Map<String, Object> claims = new HashMap<>();
        claims.put(JwtProvider.CLAIM_USERID,instructor.getId());
        claims.put(JwtProvider.CLAIM_ROLE, Role.INSTRUCTOR);
        Jwt jwt = jwtProvider.createJwt(claims);
        return LoginResponse.of(instructor.getId(), jwt);
    }
}
