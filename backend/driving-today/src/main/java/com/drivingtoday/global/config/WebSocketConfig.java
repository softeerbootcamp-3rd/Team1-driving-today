package com.drivingtoday.global.config;

import com.drivingtoday.global.auth.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.adapter.standard.StandardWebSocketHandlerAdapter;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.util.Map;

@RequiredArgsConstructor
@Configuration
@EnableWebSocket   //이게 websocket 서버로서 동작하겠다는 어노테이션
public class WebSocketConfig implements WebSocketConfigurer {

    private final WebSocketHandler webSocketHandler;
    private final JwtProvider jwtProvider;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(webSocketHandler, "/ws/chat")  // handler 등록, js에서 new Websocket할 때 경로 지정
                .addInterceptors(webSocketHandShakeinterceptor())
                .setAllowedOrigins("*"); //다른 url에서도 접속할 수있게(CORS방지)
    }

    @Bean
    public WebSocketHandShakeInterceptor webSocketHandShakeinterceptor() {
        return new WebSocketHandShakeInterceptor(jwtProvider);
    }


}