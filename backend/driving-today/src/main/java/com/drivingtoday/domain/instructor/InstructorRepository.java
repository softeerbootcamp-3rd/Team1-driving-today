package com.drivingtoday.domain.instructor;

import com.drivingtoday.domain.instructor.dto.AvailableInstructorInfo;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InstructorRepository extends JpaRepository<Instructor, Long> {

    @Query(value = "SELECT i.instructor_id as instructorId, i.name as instructorName, i.instructor_image as instructorImage, i.price_per_hour as pricePerHour, " +
            "a.name as academyName, a.latitude as latitude, a.longitude as longitude, a.cert as cert, " +
            "ROUND(ST_DISTANCE_SPHERE(POINT(a.longitude, a.latitude), POINT(:longitude, :latitude)) / 1000, 2) as distance " +
            "FROM Instructor i " +
            "JOIN Academy a ON i.academy_id = a.academy_id " +
            "WHERE NOT EXISTS " +
            "(SELECT 1 FROM Reservation r " +
            "WHERE r.instructor_id = i.instructor_id " +
            "AND r.reservation_date = :reservationDate " +
            "AND r.reservation_time BETWEEN :reservationTime AND :reservationTime + :trainingTime - 1) " +
            "ORDER BY distance",
            nativeQuery = true)
    List<AvailableInstructorInfo> findAvailableInstructors(
            String reservationDate,
            int reservationTime,
            int trainingTime,
            double latitude,
            double longitude,
            Pageable pageable
    );
}
