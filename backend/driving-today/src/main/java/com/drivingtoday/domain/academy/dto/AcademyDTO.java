package com.drivingtoday.domain.academy.dto;

import com.drivingtoday.domain.academy.Academy;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AcademyDTO {
    private Long id;
    private String name;
    private Double latitude;
    private Double longitude;
    private Boolean cert;

    public static AcademyDTO convertToDTO(Academy academy){
        AcademyDTO academyDTO = new AcademyDTO();
        academyDTO.setId(academy.getId());
        academyDTO.setName(academyDTO.getName());
        academyDTO.setLatitude(academyDTO.getLatitude());
        academyDTO.setLongitude(academyDTO.getLongitude());
        academyDTO.setCert(academyDTO.getCert());
        return academyDTO;
    }
}
