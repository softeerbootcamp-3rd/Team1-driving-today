package com.drivingtoday.global.auth.jwt;

import com.drivingtoday.global.auth.constants.Role;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.HashMap;
import java.util.Map;

@SpringBootTest
class JwtProviderTest {
    @Value("${jwt.credentials.secret-key}")
    String secretKey;

    @Autowired
    JwtProvider jwtProvider = new JwtProvider(secretKey);

    @Test
    @DisplayName("access token 만들기")
    void MakingAT(){
        //given
        Map<String, Object> claims = new HashMap<>();
        claims.put(JwtProvider.CLAIM_USERID, 1L);
        claims.put(JwtProvider.CLAIM_ROLE, Role.STUDENT);
        //when
        String accessToken = jwtProvider.createAT(claims, jwtProvider.getExpireDateAccessToken());
        //then
        Assertions.assertThat(jwtProvider.getClaims(accessToken).get("type")).isEqualTo("AT");
        Assertions.assertThat(jwtProvider.getClaims(accessToken).get("userId")).isEqualTo(1);
        Assertions.assertThat(jwtProvider.getClaims(accessToken).get("role")).isEqualTo("STUDENT");
    }

    @Test
    @DisplayName("refresh token 만들기")
    void MakingRT(){
        //given
        Map<String, Object> claims = new HashMap<>();
        //when
        String refreshToken = jwtProvider.createRT(claims, jwtProvider.getExpireDateAccessToken());
        //then
        Assertions.assertThat(jwtProvider.getClaims(refreshToken).get("type")).isEqualTo("RT");
    }

}