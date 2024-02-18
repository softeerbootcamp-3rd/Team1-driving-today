package com.drivingtoday.domain.chat;

import com.drivingtoday.domain.chat.model.ChatMessage;
import com.drivingtoday.domain.chat.ChatRoom;
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
    private final SessionService sessionService;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // Logic for handling connection establishment
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        try {
            String payload = message.getPayload();
            ChatMessage chatMessage = objectMapper.readValue(payload, ChatMessage.class);

            log.info("getRoomId : " + chatMessage.getRoomId());

            // 여기에서 ChatRoom 엔티티에 대한 로직이 변경되어야 함
            ChatRoom room = chatService.findRoomById(Long.parseLong(chatMessage.getRoomId()));

            // 방을 찾은 후, 해당 방의 세션 목록을 가져오는 대신,
            // Spring의 WebSocket 세션 관리 기능을 사용하여 세션을 관리함
            Set<WebSocketSession> sessions = sessionService.getSessionsByRoomId(chatMessage.getRoomId());

            if (chatMessage.getType().equals(ChatMessage.MessageType.ENTER)) {

                sessionService.addSessionToRoom(chatMessage.getRoomId(),session);

                chatMessage.setMessage(chatMessage.getSender() + "님이 입장했습니다.");
                log.info("ENTER room id : "+chatMessage.getRoomId() + " session count : "+sessions.size());
                log.info(chatMessage.getSender() + "님이 입장했습니다.");

                log.info("session??");
                sessions.forEach(s -> log.info("Session ID: " + s.getId()));
                log.info("----------------------");

                sendToEachSocket(sessions, new TextMessage(objectMapper.writeValueAsString(chatMessage)));
            } else if (chatMessage.getType().equals(ChatMessage.MessageType.QUIT)) {
                //sessions.remove(session);
                sessionService.removeSessionFromRoom(chatMessage.getRoomId(), session);
                log.info(chatMessage.getSender() + "님이 퇴장했습니다.");
                chatMessage.setMessage(chatMessage.getSender() + "님이 퇴장했습니다.");
                sendToEachSocket(sessions, new TextMessage(objectMapper.writeValueAsString(chatMessage)));

                log.info("session??");
                sessions.forEach(s -> log.info("Session ID: " + s.getId()));
                log.info("----------------------");

            } else {
                log.info("TALK room id : "+ chatMessage.getRoomId() + " session count : "+ sessions.size());
                log.info("TALK message : "+ chatMessage.getMessage());
                log.info("TALK message : "+ chatMessage.getSender());

                log.info("session??");
                sessions.forEach(s -> log.info("Session ID: " + s.getId()));
                log.info("----------------------");

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
                    log.info("message : "+ message);
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
