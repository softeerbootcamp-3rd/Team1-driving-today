package com.drivingtoday.global.auth.jwt;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class Jwt {
    private String accessToken;
    private String refreshToken;

    public static Jwt of(String accessToken, String refreshToken){
        return Jwt.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }
}
