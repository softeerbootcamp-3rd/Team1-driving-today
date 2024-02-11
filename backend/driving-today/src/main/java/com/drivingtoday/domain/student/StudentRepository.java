package com.drivingtoday.domain.student;

import com.drivingtoday.domain.student.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByNickname(String nickname);
}
