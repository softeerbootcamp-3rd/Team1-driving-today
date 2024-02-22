package com.drivingtoday.domain.chat.dto;


import com.drivingtoday.domain.chat.model.ChatMessage;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
public class ChatRoomInfoDetail {

    @NotNull
    private ChatRoomInfo chatRoomInfo;

    @Builder.Default
    private List<ChatMessage> chatMessageList = new ArrayList<>();

    public static ChatRoomInfoDetail from(ChatRoomInfo chatRoomInfo, List<ChatMessage> chatMessageList){
        return ChatRoomInfoDetail.builder()
                .chatRoomInfo(chatRoomInfo)
                .chatMessageList(chatMessageList)
                .build();
    }
}
