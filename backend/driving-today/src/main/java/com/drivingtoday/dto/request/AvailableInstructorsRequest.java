package com.drivingtoday.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter @Setter
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
