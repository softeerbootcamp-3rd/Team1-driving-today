package com.drivingtoday.domain.student;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByNickname(String nickname);
    Optional<Student> findByEmail(String email);
    Optional<Student> findById(Long StudentId);
}
