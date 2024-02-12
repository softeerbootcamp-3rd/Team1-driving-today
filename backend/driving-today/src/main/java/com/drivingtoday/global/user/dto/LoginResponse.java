package com.drivingtoday.global.user.dto;

import lombok.Getter;

@Getter
public class LoginResponse {
    private LoginResponse(Long id) {
        this.id = id;
    }

    private Long id;

    public static LoginResponse of(Long id){
        return new LoginResponse(id);
    }
}
