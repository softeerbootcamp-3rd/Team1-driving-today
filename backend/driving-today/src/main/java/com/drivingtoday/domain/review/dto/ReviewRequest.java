package com.drivingtoday.domain.review.dto;

import com.drivingtoday.domain.instructor.Instructor;
import com.drivingtoday.domain.review.Review;
import com.drivingtoday.domain.student.Student;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewRequest {

    @NotNull
    private Double rating;

    private String contents;

    @NotNull
    private Long reservationId;

    public Review toReview(Student student, Instructor instructor) {
        return Review.builder()
                .rating(this.rating)
                .contents(this.contents)
                .student(student)
                .instructor(instructor)
                .build();
    }
}
