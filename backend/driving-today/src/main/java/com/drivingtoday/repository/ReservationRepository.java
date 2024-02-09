package com.drivingtoday.repository;

import com.drivingtoday.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
}
