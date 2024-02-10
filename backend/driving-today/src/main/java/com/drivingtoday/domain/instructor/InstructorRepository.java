package com.drivingtoday.domain.instructor;

import com.drivingtoday.domain.instructor.Instructor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InstructorRepository extends JpaRepository<Instructor, Long> {
}
