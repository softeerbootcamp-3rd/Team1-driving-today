package com.drivingtoday.domain.chat;

import com.drivingtoday.domain.chat.model.ChatMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatMessageService {

    private final ChatMessageRepository chatMessageRepository;

    public void createChatMessage(ChatMessage chatMessage){
        chatMessageRepository.save(chatMessage);
    }

    public List<ChatMessage> findAllChatMessageByRoomId(Long RoomId){
        return chatMessageRepository.findAllByRoomId(RoomId);
    }
}
