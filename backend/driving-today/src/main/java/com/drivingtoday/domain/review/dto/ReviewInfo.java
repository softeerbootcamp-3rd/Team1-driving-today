package com.drivingtoday.domain.review.dto;

import com.drivingtoday.domain.review.Review;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ReviewInfo {
    private Long reviewId;
    private String contents;
    private Double rating;
    private LocalDateTime createdAt;
    private String reviewerName;

    public static ReviewInfo from(Review review) {
        return ReviewInfo.builder()
                .reviewId(review.getId())
                .contents(review.getContents())
                .rating(review.getRating())
                .createdAt(review.getCreatedAt())
                .reviewerName(review.getStudent().getName())
                .build();
    }
}
