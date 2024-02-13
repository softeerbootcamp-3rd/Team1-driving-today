package com.drivingtoday.domain.instructor.dto;

public interface AvailableInstructorInfo {
    Long getInstructorId();
    String getInstructorName();
    String getInstructorImage();
    Integer getPricePerHour();
    String getAcademyName();
    Double getLatitude();
    Double getLongitude();
    Boolean getCert();
    Double getDistance();
}
