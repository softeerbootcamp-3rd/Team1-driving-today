package com.drivingtoday.domain.review;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ReviewRequest {
    @NotNull
    private Double rating;

    private String contents;

    @NotNull
    private Long reservationId;
}
