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

    public void addSessionToRoom(String roomId, WebSocketSession session) {
        roomSessions.computeIfAbsent(roomId, k -> new HashSet<>()).add(session);
    }

    public void removeSessionFromRoom(String roomId, WebSocketSession session) {
        Set<WebSocketSession> sessions = roomSessions.get(roomId);
        if (sessions != null) {
            sessions.remove(session);
            if (sessions.isEmpty()) {
                roomSessions.remove(roomId);
            }
        }
    }

    public Set<WebSocketSession> getSessionsByRoomId(String roomId) {
        return roomSessions.getOrDefault(roomId, new HashSet<>());
    }

}
