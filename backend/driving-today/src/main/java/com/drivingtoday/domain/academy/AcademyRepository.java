package com.drivingtoday.domain.academy;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AcademyRepository extends JpaRepository<Academy, Long> {
    @Query("Select a from Academy a WHERE a.name like %:name%")
    List<Academy> findAllByName(String name);
}
