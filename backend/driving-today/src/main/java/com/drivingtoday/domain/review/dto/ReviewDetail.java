package com.drivingtoday.domain.review.dto;

import com.drivingtoday.domain.review.Review;
import lombok.Builder;
import lombok.Getter;
import java.time.LocalDateTime;

@Getter
@Builder
public class ReviewDetail {
    private String contents;
    private Double rating;
    private LocalDateTime createdAt;
    private String reviewerName;
    private String reviewerImage;

    public static ReviewDetail from(Review review) {
        return ReviewDetail.builder()
                .contents(review.getContents())
                .rating(review.getRating())
                .createdAt(review.getCreatedAt())
                .reviewerName(review.getStudent().getName())
                .reviewerImage(review.getStudent().getStudentImage())
                .build();
    }
}
