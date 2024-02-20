package com.drivingtoday.domain.chat.model;

import com.drivingtoday.domain.chat.ChatRoom;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Builder
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class ChatRoomInfo {

    @NotNull
    private String roomId;

    @NotNull
    private String studentId;

    @NotNull
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
