package com.drivingtoday.domain.review.dto;

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
}
