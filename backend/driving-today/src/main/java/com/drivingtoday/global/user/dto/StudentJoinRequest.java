package com.drivingtoday.global.user.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class StudentJoinRequest {
    @NotNull
    private String name;

    @NotNull
    private String nickname;

    @NotNull
    private String phoneNumber;

}
