package com.drivingtoday.domain.instructor.dto;

import com.drivingtoday.domain.instructor.Instructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class InstructorInfo {
    private Long id;
    private String name;
    private String phoneNumber;
    private String instructorImage;
    private Integer pricePerHour;
    private String introduction;

    public static InstructorInfo from(Instructor instructor) {
        return InstructorInfo.builder()
                .id(instructor.getId())
                .name(instructor.getName())
                .phoneNumber(instructor.getPhoneNumber())
                .instructorImage(instructor.getInstructorImage())
                .pricePerHour(instructor.getPricePerHour())
                .introduction(instructor.getIntroduction())
                .build();
    }
}
