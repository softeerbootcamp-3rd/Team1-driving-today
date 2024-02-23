package com.drivingtoday.domain.chat.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true) // "msg" 속성을 무시하도록 설정
public class ChatMessage {
    // 메시지 타입 : 입장, 채팅, 나감
    public enum MessageType {
        ENTER, TALK, QUIT
    }

    public enum UserType {
        STUDENT, INSTRUCTOR
    }
    private String Id; // Id
    private MessageType type; // 메시지 타입
    private Long roomId; // 방번호
    private String message; // 메시지
    private UserType userType;
    private Long userId;
    private Long timestamp; // 메시지 보낸 시간
}
