package com.drivingtoday.global.auth.config;

import com.drivingtoday.global.auth.constants.Authentication;
import com.drivingtoday.global.auth.constants.JwtErrorCode;
import com.drivingtoday.global.auth.constants.JwtException;
import com.drivingtoday.global.auth.jwt.JwtProvider;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.util.PatternMatchUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Slf4j
@RequiredArgsConstructor
@Component
public class JwtFilter extends OncePerRequestFilter {
    private final JwtProvider jwtProvider;
    private final String[] allowUriList
            = new String[]{"*/join", "*/login", "/swagger-ui/*", "**/api-docs**"};

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        final String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);
        //request uri가 allowUriList 중 하나->토큰 검증하지 않아도 됨
        if (checkAllowList(request.getRequestURI())) {
            filterChain.doFilter(request, response);
            return;
        }

        //요청 헤더에 토큰이 없는 경우
        if (!isContainToken(authorization)) {
            log.warn("{} : {}", JwtErrorCode.EMPTY_JWT.getErrorCode(), JwtErrorCode.EMPTY_JWT.getMessage());
            makeExceptionResponse(JwtErrorCode.EMPTY_JWT, response);
            return;
        }

        //토큰 꺼내기
        String accessToken = jwtProvider.resolveToken(authorization);
        //토큰 검증
        JwtErrorCode jwtErrorCode = jwtProvider.validateToken(accessToken);
        if (jwtErrorCode == JwtErrorCode.VALID_JWT_TOKEN) {
            request.setAttribute("Authentication", makeAuthentication(accessToken));
        } else {
            log.warn("{} : {}", jwtErrorCode.getErrorCode(), jwtErrorCode.getMessage());
            makeExceptionResponse(jwtErrorCode, response);
            return;
        }

        filterChain.doFilter(request, response);

    }

    private Boolean checkAllowList(String uri) {
        return PatternMatchUtils.simpleMatch(allowUriList, uri);
    }

    private Boolean isContainToken(String authorization) {
        return authorization != null && authorization.startsWith(JwtProvider.BEARER_TOKEN_PREFIX);
    }

    private Authentication makeAuthentication(String token) {
        Claims claims = jwtProvider.getClaims(token);
        return Authentication.of(claims.get(JwtProvider.CLAIM_ROLE, String.class), claims.get(JwtProvider.CLAIM_USERID, Long.class));
    }

    private void makeExceptionResponse(JwtErrorCode jwtErrorCode, HttpServletResponse response) throws IOException{
        String errorMessage = jwtErrorCode.getErrorCode() + ": " + jwtErrorCode.getMessage();
        byte[] messageBytes = errorMessage.getBytes(StandardCharsets.UTF_8);
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/plain;charset=UTF-8");
        response.setContentLength(messageBytes.length);
        response.setStatus(JwtErrorCode.EMPTY_JWT.getHttpStatus().value());
        response.getOutputStream().write(messageBytes);
    }

}
