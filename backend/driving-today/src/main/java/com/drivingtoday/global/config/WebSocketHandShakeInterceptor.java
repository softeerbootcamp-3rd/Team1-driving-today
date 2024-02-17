package com.drivingtoday.global.config;

import com.drivingtoday.global.auth.config.JwtFilter;
import com.drivingtoday.global.auth.constants.Authentication;
import com.drivingtoday.global.auth.constants.Role;
import com.drivingtoday.global.auth.exception.JwtErrorCode;
import com.drivingtoday.global.auth.jwt.JwtProvider;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.util.Map;
import java.util.Objects;

@Slf4j
@RequiredArgsConstructor
public class WebSocketHandShakeInterceptor implements HandshakeInterceptor {

    private final JwtProvider jwtProvider;

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
        String accessToken = request.getHeaders().getFirst("Sec-WebSocket-Protocol");

        log.info("accessToken: " + accessToken);

        String subProtocol = new String(accessToken);
        response.getHeaders().set("Sec-WebSocket-Protocol", subProtocol);
        try{

            JwtErrorCode jwtErrorCode = jwtProvider.validateToken(accessToken);
            Authentication auth = makeAuthentication(accessToken);

            Authentication loginedAuthentication = JwtFilter.getAuthentication();

            if(Objects.equals(auth.getId(), loginedAuthentication.getId())){
                log.info("logged in ID : " + loginedAuthentication.getId());
            }
            return Objects.equals(auth.getId(), loginedAuthentication.getId()) && Objects.equals(loginedAuthentication.getRole(), Role.STUDENT.toString());
        }catch(Exception e){
            response.setStatusCode(HttpStatus.UNAUTHORIZED);
            return false;
        }

    }
    private Authentication makeAuthentication(String token) {
        Claims claims = jwtProvider.getClaims(token);
        return Authentication.of(claims.get(JwtProvider.CLAIM_ROLE, String.class), claims.get(JwtProvider.CLAIM_USERID, Long.class));
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Exception exception) {

    }
}