package com.drivingtoday.service;

import com.drivingtoday.dto.request.AvailableInstructorsRequest;
import com.drivingtoday.entity.Instructor;
import com.drivingtoday.repository.InstructorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
@RequiredArgsConstructor
public class InstructorService {

    private final InstructorRepository instructorRepository;
    public List<Instructor> findAvailableInstructors(AvailableInstructorsRequest request) {
        return instructorRepository.findAvailableInstructors(
                request.getReservationDate().toString(),
                request.getReservationTime(),
                request.getTrainingTime(),
                request.getLatitude(),
                request.getLongitude(),
                request.getPageSize(),
                (request.getPageNumber() - 1) * request.getPageSize()
        );
    }

}
