package com.drivingtoday.global.user.dto;

import com.drivingtoday.global.auth.jwt.Jwt;
import lombok.Getter;

@Getter
public class LoginResponse {
    private LoginResponse(Long id, Jwt jwt) {
        this.id = id;
        this.jwt = jwt;
    }

    private Long id;
    //TODO : 토큰
    private Jwt jwt;

    public static LoginResponse of(Long id, Jwt jwt) {
        return new LoginResponse(id, jwt);
    }
}
