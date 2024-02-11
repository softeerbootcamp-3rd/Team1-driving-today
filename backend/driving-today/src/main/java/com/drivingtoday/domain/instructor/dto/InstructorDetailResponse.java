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
    private List<ReviewDetail> reviews;

    public static InstructorDetailResponse of(Instructor instructor, List<Review> reviews) {
        return InstructorDetailResponse.builder()
                .instructorInfo(InstructorInfo.from(instructor))
                .academyInfo(AcademyInfo.from(instructor.getAcademy()))
                .reviews(reviews.stream().map(ReviewDetail::from).toList())
                .build();
    }
}


