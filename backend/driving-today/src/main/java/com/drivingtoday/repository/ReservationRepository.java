package com.drivingtoday.repository;

import com.drivingtoday.entity.Instructor;
import com.drivingtoday.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    @Query("SELECT i FROM Instructor i WHERE NOT EXISTS " +
            "(SELECT 1 FROM Reservation r WHERE r.instructor = i " +
            "AND r.reservationDate = :reservationDate " +
            "AND r.reservationTime BETWEEN :reservationTime AND :reservationTime + :trainingTime - 1)")
    List<Instructor> findAvailableInstructors(LocalDate reservationDate, int reservationTime, int trainingTime);
}
