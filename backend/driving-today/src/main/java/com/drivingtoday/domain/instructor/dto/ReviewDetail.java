package com.drivingtoday.domain.instructor.dto;

import com.drivingtoday.domain.review.Review;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ReviewDetail {
    private String reviewerName;
    private String contents;
    private Double rating;
    private LocalDateTime createdAt;

    public static ReviewDetail from(Review review) {
        return ReviewDetail.builder()
                .reviewerName(review.getStudent().getName())
                .contents(review.getContents())
                .rating(review.getRating())
                .createdAt(review.getCreatedAt())
                .build();
    }
}
