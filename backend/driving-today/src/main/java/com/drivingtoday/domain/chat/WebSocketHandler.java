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
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Set;
import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class WebSocketHandler extends TextWebSocketHandler {
    private final ObjectMapper objectMapper;
    private final ChatService chatService;
    private final SessionService sessionService;
    private final ChatMessageService chatMessageService;

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

            Set<WebSocketSession> sessions = sessionService.getSessionsByRoomId(chatMessage.getRoomId().toString());
            if (chatMessage.getType().equals(ChatMessage.MessageType.ENTER)) {

                sessionService.addSessionToRoom(chatMessage.getRoomId().toString(),session);
                chatMessage.setMessage(chatMessage.getUserId() + "님이 입장했습니다.");
                sendToEachSocket(sessions, new TextMessage(objectMapper.writeValueAsString(chatMessage)));

            } else if (chatMessage.getType().equals(ChatMessage.MessageType.QUIT)) {

                sessionService.removeSessionFromRoom(chatMessage.getRoomId().toString(), session);
                chatMessage.setMessage(chatMessage.getUserId() + "님이 퇴장했습니다.");
                sendToEachSocket(sessions, new TextMessage(objectMapper.writeValueAsString(chatMessage)));

            } else {
                // 채팅메시지 저장
                LocalDateTime currentDate = LocalDateTime.now();
                long millis = currentDate.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
                chatMessage.setTimestamp(millis);
                chatMessage.setId(UUID.randomUUID().toString());

                chatMessageService.createChatMessage(chatMessage);
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
