package com.drivingtoday.domain.review.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewFindRequest {
    private Long instructorId;
    private Integer pageNumber;
    private Integer pageSize;
}
