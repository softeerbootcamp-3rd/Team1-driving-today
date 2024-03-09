package com.drivingtoday.global.auth.config;

import com.drivingtoday.global.auth.constants.Authentication;
import com.drivingtoday.global.auth.exception.JwtErrorCode;
import com.drivingtoday.global.auth.jwt.AuthenticationContextHolder;
import com.drivingtoday.global.auth.jwt.Jwt;
import com.drivingtoday.global.auth.jwt.JwtProvider;
import com.google.gson.Gson;
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
import java.util.Enumeration;

@Slf4j
@RequiredArgsConstructor
@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtProvider jwtProvider;
    private final String[] allowUriList
            = new String[]{"*/health", "*/academies**", "*/register", "*/login", "/swagger-ui/*", "**/api-docs**"};

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // CORS 관련 헤더 추가
        response.setHeader("Access-Control-Allow-Origin", "*"); // 모든 origin을 허용
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // 허용하는 HTTP 메소드
        response.setHeader("Access-Control-Allow-Headers", "*"); // 모든 헤더를 허용
        response.setHeader("Access-Control-Max-Age", "3600"); // CORS Preflight 요청에 대한 유효 시간 설정

        // OPTIONS 메소드에 대한 처리
        if ("OPTIONS".equals(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
        } else {

            String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);

            if (authorization == null) {
                if (request.getRequestURI().contains("ws")) {
                    if (request.getQueryString() != null)
                        authorization = "Bearer " + request.getQueryString().split("=")[1];
                }
            }

            Enumeration<String> headerNames = request.getHeaderNames();
            while (headerNames.hasMoreElements()) {
                String headerName = headerNames.nextElement();
                if (headerName.contains("sec-websocket-protocol")) {
                    if (authorization == null) {
                        authorization = "Bearer " + request.getHeader(headerName);
                    }
                }
            }

            //토큰 검증이 필요하지 않은 api는 필터 진행하지 않음
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
            String token = jwtProvider.resolveToken(authorization);
            //토큰 검증
            JwtErrorCode jwtErrorCode = jwtProvider.validateToken(token);
            //유효한 access token
            if (jwtErrorCode == JwtErrorCode.VALID_JWT_TOKEN) {
                if(jwtProvider.getType(token).equals("AT")){
                    AuthenticationContextHolder.setAuthentication(makeAuthentication(token));
                }
                //유효한 refresh token
                else{
                    log.debug("토큰 재발급");
                    issueNewToken(token, response);
                    return;
                }

            }
            else {
                log.warn("{} : {}", jwtErrorCode.getErrorCode(), jwtErrorCode.getMessage());
                makeExceptionResponse(jwtErrorCode, response);
                return;
            }

            filterChain.doFilter(request, response);
        }
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

    private void makeExceptionResponse(JwtErrorCode jwtErrorCode, HttpServletResponse response) throws IOException {
        String errorMessage = jwtErrorCode.getErrorCode() + ": " + jwtErrorCode.getMessage();
        byte[] messageBytes = errorMessage.getBytes(StandardCharsets.UTF_8);
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/plain;charset=UTF-8");
        response.setContentLength(messageBytes.length);
        response.setStatus(JwtErrorCode.EMPTY_JWT.getHttpStatus().value());
        response.getOutputStream().write(messageBytes);
    }

    private void issueNewToken(String refreshToken, HttpServletResponse response) throws IOException {
        Jwt jwt = jwtProvider.createJwt(jwtProvider.getClaims(refreshToken));
        byte[] tokens = new Gson().toJson(jwt).getBytes(StandardCharsets.UTF_8);
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json;charset=UTF-8");
        response.setContentLength(tokens.length);
        response.setStatus(200);
        response.getOutputStream().write(tokens);
    }
}
