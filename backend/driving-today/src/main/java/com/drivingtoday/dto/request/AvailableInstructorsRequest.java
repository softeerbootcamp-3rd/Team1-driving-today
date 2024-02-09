package com.drivingtoday.dto.request;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class AvailableInstructorsRequest {
    private double latitude;
    private double longitude;
    private int trainingTime;
    private int reservationTime;
    private LocalDate reservationDate;
    private int pageNumber;
    private int pageSize;
}
