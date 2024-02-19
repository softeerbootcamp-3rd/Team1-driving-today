package com.drivingtoday.domain.chat.model;

import com.drivingtoday.domain.chat.ChatRoom;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashSet;
import java.util.Set;

@Getter
@Builder
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class ChatRoomInfo {

    private String roomId;
    private String studentId;
    private String instructorId;

    @JsonIgnore
    final Set<WebSocketSession> sessions = new HashSet<>();
    public static ChatRoomInfo from(ChatRoom chatRoom) {
        return ChatRoomInfo.builder()
                .roomId(chatRoom.getId().toString())
                .studentId(chatRoom.getStudent().getId().toString())
                .instructorId(chatRoom.getInstructor().getId().toString())
                .build();
    }
}
