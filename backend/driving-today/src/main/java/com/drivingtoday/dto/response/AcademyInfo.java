package com.drivingtoday.dto.response;

import com.drivingtoday.entity.Academy;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AcademyInfo {
    private String academyName;
    private Double latitude;
    private Double longitude;

    public static AcademyInfo from(Academy academy) {
        return AcademyInfo.builder()
                .academyName(academy.getName())
                .latitude(academy.getLatitude())
                .longitude(academy.getLongitude())
                .build();
    }
}
