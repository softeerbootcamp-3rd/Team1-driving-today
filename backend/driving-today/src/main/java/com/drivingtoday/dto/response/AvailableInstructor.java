package com.drivingtoday.dto.response;

import com.drivingtoday.entity.Instructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AvailableInstructor {
    private Long instructorId;
    private String instructorName;
    private AcademyInfo academyInfo;
    private Integer pricePerHour;
    private String phoneNumber;
    private String image;
    private String introduction;

    public static AvailableInstructor from(Instructor instructor) {
        return AvailableInstructor.builder()
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
