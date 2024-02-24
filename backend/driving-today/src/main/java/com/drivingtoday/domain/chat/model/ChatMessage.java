package com.drivingtoday.domain.chat.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class ChatMessage {
    public enum MessageType {
        ENTER, TALK, QUIT
    }
    public enum UserType {
        STUDENT, INSTRUCTOR
    }
    private String Id;
    private MessageType type;
    private Long roomId;
    private String message;
    private UserType userType;
    private Long userId;
    private Long timestamp;
}
