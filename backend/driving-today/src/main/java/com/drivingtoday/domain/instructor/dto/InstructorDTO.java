package com.drivingtoday.domain.instructor.dto;

import com.drivingtoday.domain.academy.Academy;
import com.drivingtoday.domain.academy.dto.AcademyDTO;
import com.drivingtoday.domain.instructor.Instructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InstructorDTO {

    private String name;
    private String phoneNumber;
    private String instructorImage;
    private Integer pricePerHour;
    private String introduction;
    private AcademyDTO academyDTO;

    public static InstructorDTO convertToDTO(Instructor instructor){
        InstructorDTO instructorDTO = new InstructorDTO();
        instructorDTO.setName(instructor.getName());
        instructorDTO.setPhoneNumber(instructor.getPhoneNumber());
        instructorDTO.setInstructorImage(instructor.getInstructorImage());
        instructorDTO.setPricePerHour(instructor.getPricePerHour());
        instructorDTO.setIntroduction(instructor.getIntroduction());
        instructorDTO.setAcademyDTO(AcademyDTO.convertToDTO(instructor.getAcademy()));
        return instructorDTO;
    }

}
