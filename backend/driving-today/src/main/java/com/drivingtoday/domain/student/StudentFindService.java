package com.drivingtoday.domain.student;

import com.drivingtoday.domain.student.dto.StudentInfo;
import com.drivingtoday.domain.student.exception.StudentErrorCode;
import com.drivingtoday.domain.student.exception.StudentException;
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
                .orElseThrow(() -> StudentException.from(StudentErrorCode.STUDENT_NOT_EXISTS));
        return StudentInfo.from(student);
    }

    @Transactional
    public Student findById(Long studentId){
        return studentRepository.findById(studentId)
                .orElseThrow(() -> StudentException.from(StudentErrorCode.STUDENT_NOT_EXISTS));
    }
}
