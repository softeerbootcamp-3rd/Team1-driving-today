package com.drivingtoday.service;

import com.drivingtoday.entity.Instructor;
import com.drivingtoday.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InstructorService {

    private final ReservationRepository reservationRepository;

    public List<Instructor> getInstructorList(LocalDate reservationDate, int reservationTime, int trainingTime) {
        List<Instructor> availableInstructors = reservationRepository.findAvailableInstructors(reservationDate, reservationTime, trainingTime);
        return availableInstructors;
    }
}
