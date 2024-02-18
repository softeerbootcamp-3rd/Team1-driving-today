package com.drivingtoday.domain.chat;

import com.drivingtoday.domain.chat.ChatRoom;
import com.drivingtoday.domain.chat.model.ChatRoomInfo;
import com.drivingtoday.domain.instructor.Instructor;
import com.drivingtoday.domain.student.Student;
import com.drivingtoday.domain.student.StudentFindService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChatService {

    private final ObjectMapper objectMapper;

    private final ChatRoomRepository chatRoomRepository;

    public ChatRoom findRoomById(Long roomId) {
        Optional<ChatRoom> room = chatRoomRepository.findById(roomId);
        return room.orElseThrow(() -> new RuntimeException("Room doesn't exist with id: " + roomId));
    }

    @Transactional
    public ChatRoom findByStudentIdAndInstructorId(String studentId, String instructorId){
        return chatRoomRepository.findByStudentIdAndInstructorId(studentId, instructorId);
    }


    @Transactional
    public ChatRoomInfo createRoom(Instructor instructor, Student student) {

        ChatRoom chatRoom = ChatRoom.builder()
                //.roomId(roomId)
                .student(student)
                .instructor(instructor)
                .build();
        chatRoomRepository.save(chatRoom);
        log.info("CHAT ROOM WITH " + chatRoom.getId() + " CREATED WITH " + instructor.getName() + " and " + student.getName());
        return ChatRoomInfo.from(chatRoom, student.getId().toString());
    }



    /////////////////////////////////////////////////// 위가 새로운 코드
    /*
    private Map<String, ChatRoom> chatRooms;


    @PostConstruct
    private void init() {
        chatRooms = new LinkedHashMap<>();
    }

    public List<ChatRoom> findAllRoom() {
       return new ArrayList<>(chatRooms.values());
    }

    public ChatRoom findRoomById(String roomId) {
        return chatRooms.get(roomId);
    }

    public ChatRoom createRoom() {
        String randomId = UUID.randomUUID().toString();
        ChatRoom chatRoom = ChatㅁRoom.builder()
                .roomId(randomId)
                //.name(name)
                .build();
        chatRooms.put(randomId, chatRoom);
        return chatRoom;
    }

     */
}
