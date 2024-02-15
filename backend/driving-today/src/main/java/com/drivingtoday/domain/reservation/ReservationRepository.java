package com.drivingtoday.domain.reservation;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    Page<Reservation> findAllByStudentId(Long studentId, Pageable pageable);

    Page<Reservation> findAllByInstructorId(Long instructorId, Pageable pageable);

}
