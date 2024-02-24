package com.drivingtoday.domain.review.dto;

import com.drivingtoday.domain.review.Review;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;
import java.time.LocalDateTime;

@Getter
@Builder
public class ReviewInfo {
    private Long reviewId;
    private String contents;
    private Double rating;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;
    private String reviewerName;
    private String reviewerImage;

    public static ReviewInfo from(Review review) {
        return ReviewInfo.builder()
                .reviewId(review.getId())
                .contents(review.getContents())
                .rating(review.getRating())
                .createdAt(review.getCreatedAt())
                .reviewerName(review.getStudent().getName())
                .reviewerImage(review.getStudent().getStudentImage())
                .build();
    }
}
