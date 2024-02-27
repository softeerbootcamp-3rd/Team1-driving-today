package com.drivingtoday.global.auth.constants;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class Authentication {
    String role;
    Long id;

    public static Authentication of(String role, Long id){
        return Authentication.builder()
                .id(id)
                .role(role)
                .build();
    }

    public static Authentication createEmptyAuthentication(){
        return Authentication.builder()
                .role("NAN")
                .id(null)
                .build();
    }
}
