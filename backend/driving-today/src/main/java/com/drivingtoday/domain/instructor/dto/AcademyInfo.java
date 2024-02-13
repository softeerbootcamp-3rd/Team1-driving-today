package com.drivingtoday.domain.instructor.dto;

import com.drivingtoday.domain.academy.Academy;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AcademyInfo {
    private String name;
    private Double latitude;
    private Double longitude;
    private Boolean cert;

    public static AcademyInfo from(Academy academy) {
        return AcademyInfo.builder()
                .name(academy.getName())
                .latitude(academy.getLatitude())
                .longitude(academy.getLongitude())
                .cert(academy.getCert())
                .build();
    }
}
