package com.drivingtoday.global.auth.jwt;

import com.drivingtoday.global.auth.exception.JwtErrorCode;
import io.jsonwebtoken.*;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
@Slf4j
public class JwtProvider {
    public static final String CLAIM_USERID = "userId";
    public static final String CLAIM_ROLE = "role";
    public static final String BEARER_TOKEN_PREFIX = "Bearer ";

    @Getter
    private final String key;

    @Value("${jwt.access-token.expire-length}")
    private Long accessTokenExpireLengthInSeconds;

    @Value("${jwt.refresh-token.expire-length}")
    private Long refreshTokenExpireLengthInSeconds;

    public JwtProvider(@Value("${jwt.credentials.secret-key}") String secretKey) {
        this.key = secretKey;
    }

    public String createAT(Map<String, Object> claims, Date expireDate) {
        claims.put("type", "AT");
        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(expireDate)
                .signWith(SignatureAlgorithm.HS256, key)
                .compact();
    }
    public String createRT(Map<String, Object> claims, Date expireDate) {
        claims.put("type", "RT");
        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(expireDate)
                .signWith(SignatureAlgorithm.HS256, key)
                .compact();
    }

    public Jwt createJwt(Map<String, Object> claims) {
        String accessToken = createAT(claims, getExpireDateAccessToken());
        String refreshToken = createRT(claims, getExpireDateRefreshToken());
        return Jwt.of(accessToken, refreshToken);
    }

    public Claims getClaims(String token) {
        return Jwts.parser()
                .setSigningKey(key)
                .parseClaimsJws(token)
                .getBody();
    }

    public String getType(String token){
        Claims claims = getClaims(token);
        return (String) claims.get("type");
    }

    public Date getExpireDateAccessToken() {
        long expireTimeMils = 1000L * accessTokenExpireLengthInSeconds;
        return new Date(System.currentTimeMillis() + expireTimeMils);
    }

    public Date getExpireDateRefreshToken() {
        long expireTimeMils = 1000L * refreshTokenExpireLengthInSeconds;
        return new Date(System.currentTimeMillis() + expireTimeMils);
    }

    public String resolveToken(String authorization) {
        return authorization.split(" ")[1];
    }

    public JwtErrorCode validateToken(String token) {
        try {
            getClaims(token);
            return JwtErrorCode.VALID_JWT_TOKEN;
        } catch (SignatureException exception) {
            return JwtErrorCode.INVALID_JWT_SIGNATURE;
        } catch (MalformedJwtException exception) {
            return JwtErrorCode.INVALID_JWT_TOKEN;
        } catch (ExpiredJwtException exception) {
            return JwtErrorCode.EXPIRED_JWT_TOKEN;
        } catch (UnsupportedJwtException exception) {
            return JwtErrorCode.UNSUPPORTED_JWT_TOKEN;
        } catch (IllegalArgumentException exception) {
            return JwtErrorCode.EMPTY_JWT;
        }
    }
}
