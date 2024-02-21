package com.drivingtoday.domain.academy;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AcademyRepository extends JpaRepository<Academy, Long> {
    List<Academy> findAllByName(String name);
}
