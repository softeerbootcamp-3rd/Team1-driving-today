package com.drivingtoday.domain.instructor;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InstructorRepository extends JpaRepository<Instructor, Long> {

    @Query(value = "SELECT i.* " +
            "FROM Instructor i " +
            "JOIN Academy a ON i.academy_id = a.academy_id " +
            "WHERE NOT EXISTS " +
            "(SELECT 1 FROM Reservation r " +
            "WHERE r.instructor_id = i.instructor_id " +
            "AND r.reservation_date = :reservationDate " +
            "AND r.reservation_time BETWEEN :reservationTime AND :reservationTime + :trainingTime - 1) " +
            "ORDER BY ST_DISTANCE_SPHERE(POINT(a.longitude, a.latitude), POINT(:longitude, :latitude)) " +
            "LIMIT :pageSize OFFSET :offset",
            nativeQuery = true)
    List<Instructor> findAvailableInstructors(
            String reservationDate,
            int reservationTime,
            int trainingTime,
            double latitude,
            double longitude,
            int pageSize,
            int offset
    );
}
