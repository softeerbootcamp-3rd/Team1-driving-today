package com.drivingtoday.domain.chat;

import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Service
public class SessionService {

    private final Map<String, Set<WebSocketSession>> roomSessions = new HashMap<>();

    // 방에 새로운 세션을 추가하는 메서드
    public void addSessionToRoom(String roomId, WebSocketSession session) {
        roomSessions.computeIfAbsent(roomId, k -> new HashSet<>()).add(session);
    }

    // 방에서 세션을 제거하는 메서드
    public void removeSessionFromRoom(String roomId, WebSocketSession session) {
        Set<WebSocketSession> sessions = roomSessions.get(roomId);
        if (sessions != null) {
            sessions.remove(session);
            if (sessions.isEmpty()) {
                roomSessions.remove(roomId);
            }
        }
    }

    // 방에 속한 모든 세션을 반환하는 메서드
    public Set<WebSocketSession> getSessionsByRoomId(String roomId) {
        return roomSessions.getOrDefault(roomId, new HashSet<>());
    }

}
