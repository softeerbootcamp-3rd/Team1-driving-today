package com.drivingtoday.domain.chat.dto;

import com.drivingtoday.domain.chat.model.ChatMessage;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

import java.util.Comparator;
import java.util.List;

@Getter
@Builder
public class ChatRoomInfoConcise {

    @NotNull
    private ChatRoomInfo chatRoomInfo;

    private ChatMessage lastMessage;

    public static ChatRoomInfoConcise from(ChatRoomInfo chatRoomInfo, List<ChatMessage> chatMessageList){
        ChatMessage lastChatMessage = null;
        if(!chatMessageList.isEmpty()){
            chatMessageList.sort(Comparator.comparing(ChatMessage::getTimestamp));
            lastChatMessage = chatMessageList.get(chatMessageList.size()-1);
        }
        return ChatRoomInfoConcise.builder()
                .chatRoomInfo(chatRoomInfo)
                .lastMessage(lastChatMessage)
                .build();
    }
}
