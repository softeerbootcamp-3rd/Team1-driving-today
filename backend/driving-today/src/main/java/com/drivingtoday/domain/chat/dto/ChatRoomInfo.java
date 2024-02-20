package com.drivingtoday.domain.chat.dto;

import com.drivingtoday.domain.chat.model.ChatRoom;
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
    private Long roomId;

    @NotNull
    private Long studentId;

    @NotNull
    private Long instructorId;

    @JsonIgnore
    final Set<WebSocketSession> sessions = new HashSet<>();
    public static ChatRoomInfo from(ChatRoom chatRoom) {
        return ChatRoomInfo.builder()
                .roomId(chatRoom.getId())
                .studentId(chatRoom.getStudent().getId())
                .instructorId(chatRoom.getInstructor().getId())
                .build();
    }
}
