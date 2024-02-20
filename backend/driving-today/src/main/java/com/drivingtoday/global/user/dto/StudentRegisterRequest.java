package com.drivingtoday.global.user.dto;

import com.drivingtoday.domain.student.Student;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class StudentRegisterRequest {

    @NotNull
    private String name;

    @NotNull
    private String nickname;

    @NotNull
    @Email
    private String email;

    @NotNull
    private String password;

    @NotNull
    private String phoneNumber;

    public Student toStudent(String profileUrl) {
        return Student.builder()
                .name(this.name)
                .nickname(this.nickname)
                .email(this.email)
                .password(this.password)
                .phoneNumber(this.phoneNumber)
                .studentImage(profileUrl)
                .build();
    }
}
