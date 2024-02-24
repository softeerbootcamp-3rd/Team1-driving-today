package com.drivingtoday.domain.instructor.dto;


import com.drivingtoday.domain.academy.dto.AcademyInfo;
import com.drivingtoday.domain.instructor.Instructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class InstructorDetailResponse {
    private InstructorInfo instructorInfo;
    private AcademyInfo academyInfo;
    private Double averageRating;

    public static InstructorDetailResponse of(Instructor instructor, Double averageRating) {
        return InstructorDetailResponse.builder()
                .instructorInfo(InstructorInfo.from(instructor))
                .academyInfo(AcademyInfo.from(instructor.getAcademy()))
                .averageRating(averageRating)
                .build();
    }

}
