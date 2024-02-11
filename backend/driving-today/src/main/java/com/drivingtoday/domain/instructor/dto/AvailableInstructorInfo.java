package com.drivingtoday.domain.instructor.dto;

import com.drivingtoday.domain.instructor.Instructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AvailableInstructorInfo {
    private Long instructorId;
    private String instructorName;
    private AcademyInfo academyInfo;
    private Integer pricePerHour;
    private String phoneNumber;
    private String image;
    private String introduction;

    public static AvailableInstructorInfo from(Instructor instructor) {
        return AvailableInstructorInfo.builder()
                .instructorId(instructor.getId())
                .instructorName(instructor.getName())
                .academyInfo(AcademyInfo.from(instructor.getAcademy()))
                .pricePerHour(instructor.getPricePerHour())
                .phoneNumber(instructor.getPhoneNumber())
                .image(instructor.getInstructorImage())
                .introduction(instructor.getIntroduction())
                .build();
    }
}
