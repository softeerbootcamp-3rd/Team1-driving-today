package com.drivingtoday.domain.reservation;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    Page<Reservation> findAllByStudentId(Long studentId, Pageable pageable);

    @Query("SELECT r FROM Reservation r WHERE (r.reservationDate > :currentDate " +
            "OR (r.reservationDate = :currentDate AND r.reservationTime > :currentTime)) " +
            "AND r.instructor.id = :instructorId")
    Page<Reservation> findFutureReservationsByInstructor
            (Long instructorId, LocalDate currentDate, Integer currentTime, Pageable pageable);

    @Query("SELECT r FROM Reservation r WHERE (r.reservationDate < :currentDate " +
            "OR (r.reservationDate = :currentDate AND r.reservationTime <= :currentTime)) " +
            "AND r.instructor.id = :instructorId")
    Page<Reservation> findPastReservationsByInstructor
            (Long instructorId, LocalDate currentDate, Integer currentTime, Pageable pageable);

    @Query("SELECT COUNT(r) FROM Reservation r WHERE r.instructor.id = :instructorId AND r.reservationDate = :date " +
            "AND ((r.reservationTime BETWEEN :startTime AND :startTime + :trainingTime - 1) " +
            "OR (r.reservationTime + r.trainingTime - 1 BETWEEN :startTime AND :startTime + :trainingTime - 1))" )
    Integer countConfilctTimeSlot(Long instructorId, int startTime, int trainingTime, LocalDate date);
}
