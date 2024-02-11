package com.drivingtoday.global.user.dto;

import com.drivingtoday.domain.student.Student;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class StudentJoinRequest {
    @NotNull
    private String name;

    @NotNull
    private String nickname;

    @NotNull
    private String phoneNumber;

    public Student toStudent(String profileUrl) {
        return Student.builder()
                .name(this.name)
                .nickname(this.nickname)
                .phoneNumber(this.phoneNumber)
                .studentImage(profileUrl)
                .build();
    }
}
