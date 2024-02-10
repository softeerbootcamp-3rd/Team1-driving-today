package com.drivingtoday.domain.academy;

import com.drivingtoday.domain.academy.Academy;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AcademyRepository extends JpaRepository<Academy, Long> {
}
