package com.drivingtoday.domain.reservation;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    @Query(value = "select * from Reservation where student_id = ?1", nativeQuery = true)
    List<Reservation> findAllByStudentId(Long studentId);

    @Query(value = "select * from Reservation where instructor_id = ?1", nativeQuery = true)
    List<Reservation> findAllByInstructorId(Long instructorId);

}
