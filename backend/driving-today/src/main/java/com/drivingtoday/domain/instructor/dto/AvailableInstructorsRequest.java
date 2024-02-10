package com.drivingtoday.domain.instructor.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
public class AvailableInstructorsRequest {
    private double latitude;
    private double longitude;
    private int trainingTime;
    private int reservationTime;
    private LocalDate reservationDate;
    private int pageNumber;
    private int pageSize;
}
