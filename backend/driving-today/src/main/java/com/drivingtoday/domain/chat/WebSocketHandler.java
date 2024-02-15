package com.drivingtoday.domain.chat;

import com.drivingtoday.domain.chat.model.ChatMessage;
import com.drivingtoday.domain.chat.model.ChatRoom;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.Set;

@Slf4j
@Component
@RequiredArgsConstructor
public class WebSocketHandler extends TextWebSocketHandler {
    private final ObjectMapper objectMapper;
    private final ChatService chatService;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // Logic for handling connection establishment
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        try {
            String payload = message.getPayload();
            ChatMessage chatMessage = objectMapper.readValue(payload, ChatMessage.class);
            ChatRoom room = chatService.findRoomById(chatMessage.getRoomId());
            Set<WebSocketSession> sessions = room.getSessions();
            if (chatMessage.getType().equals(ChatMessage.MessageType.ENTER)) {
                sessions.add(session);
                chatMessage.setMessage(chatMessage.getSender() + "님이 입장했습니다.");
                sendToEachSocket(sessions, new TextMessage(objectMapper.writeValueAsString(chatMessage)));
            } else if (chatMessage.getType().equals(ChatMessage.MessageType.QUIT)) {
                sessions.remove(session);
                chatMessage.setMessage(chatMessage.getSender() + "님이 퇴장했습니다.");
                sendToEachSocket(sessions, new TextMessage(objectMapper.writeValueAsString(chatMessage)));
            } else {
                sendToEachSocket(sessions, message);
            }
        } catch (IOException e) {
            log.error("Error processing WebSocket message", e);
        }
    }

    private void sendToEachSocket(Set<WebSocketSession> sessions, TextMessage message) {
        sessions.parallelStream().forEach(roomSession -> {
            try {
                if (roomSession.isOpen()) {
                    roomSession.sendMessage(message);
                }
            } catch (IOException e) {
                log.error("Error sending message via WebSocket", e);
            }
        });
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        // Logic for handling connection closure
    }
}
