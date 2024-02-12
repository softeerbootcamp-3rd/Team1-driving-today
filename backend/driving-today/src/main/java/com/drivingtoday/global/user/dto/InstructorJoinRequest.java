package com.drivingtoday.global.user.dto;

import com.drivingtoday.domain.academy.Academy;
import com.drivingtoday.domain.instructor.Instructor;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class InstructorJoinRequest {
    @NotNull
    private String name;

    @NotNull
    @Email
    private String email;

    @NotNull
    private String password;

    @NotNull
    private String phoneNumber;

    @NotNull
    private Integer pricePerHour;

    @NotNull
    private String introduction;

    @NotNull
    private Long academyId;

    public Instructor toInstructor(Academy academy, String profileImg){
        return Instructor.builder()
                .name(this.name)
                .phoneNumber(this.phoneNumber)
                .instructorImage(profileImg)
                .pricePerHour(this.pricePerHour)
                .introduction(this.introduction)
                .academy(academy)
                .build();
    }
}
