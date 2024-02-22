package com.drivingtoday.domain.academy.dto;

import com.drivingtoday.domain.academy.Academy;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AcademySearchResponse {

    private Long academyId;
    private String name;

    public static AcademySearchResponse from(Academy academy) {
        return AcademySearchResponse.builder()
                .academyId(academy.getId())
                .name(academy.getName())
                .build();
    }
}
