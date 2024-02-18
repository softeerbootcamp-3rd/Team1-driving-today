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
    //String name;
    private String studentId;

    @JsonIgnore
    Set<WebSocketSession> sessions = new HashSet<>();
    public static ChatRoomInfo from(ChatRoom chatRoom, String StudentId) {
        return ChatRoomInfo.builder()
                .roomId(chatRoom.getId().toString())
                .studentId(StudentId)
                .build();
        //this.name = name;
    }
}
