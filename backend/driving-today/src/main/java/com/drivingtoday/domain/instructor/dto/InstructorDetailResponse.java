package com.drivingtoday.domain.instructor.dto;

import com.drivingtoday.domain.instructor.Instructor;
import com.drivingtoday.domain.review.Review;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class InstructorDetailResponse {
    private InstructorInfo instructorInfo;
    private AcademyInfo academyInfo;

    public static InstructorDetailResponse from(Instructor instructor) {
        return InstructorDetailResponse.builder()
                .instructorInfo(InstructorInfo.from(instructor))
                .academyInfo(AcademyInfo.from(instructor.getAcademy()))
                .build();
    }
}


