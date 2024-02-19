package com.drivingtoday.domain.student;

import com.drivingtoday.domain.student.dto.StudentInfo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudentFindService {

    private final StudentRepository studentRepository;

    @Transactional
    public StudentInfo findStudent(Long studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("해당 학생이 존재하지 않습니다."));
        return StudentInfo.from(student);
    }

    @Transactional
    public Student findById(Long studentId){
        return studentRepository.findById(studentId).orElseThrow(() -> new RuntimeException("id에 의한 학생이 존재하지 않습니다,"));
    }
}
