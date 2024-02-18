package com.drivingtoday.domain.chat;

import com.drivingtoday.domain.chat.ChatRoom;
import com.drivingtoday.domain.chat.model.ChatRoomInfo;
import com.drivingtoday.domain.instructor.Instructor;
import com.drivingtoday.domain.instructor.InstructorFindService;
import com.drivingtoday.domain.student.Student;
import com.drivingtoday.domain.student.StudentFindService;
import com.drivingtoday.global.auth.config.JwtFilter;
import com.drivingtoday.global.auth.constants.Authentication;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ChatController {

    private final ChatService chatService;
    private final InstructorFindService instructorFindService;
    private final StudentFindService studentFindService;

    @Operation(summary = "강사가 본인한테 온 메시지 톡방들 리스트화")
    @RequestMapping("/chat/rooms")  // /chat/roomList
    public ResponseEntity<List<ChatRoomInfo>> chatList(){
        List<ChatRoomInfo> roomList = chatService.findAllRooms();
        return ResponseEntity.ok().body(roomList);
    }

    @Operation(summary = "학생이 강사 채팅 버튼 눌러서 방 만들거나 이미 있던 방 들어가기")
    @PostMapping("/chat/room")  //방을 만들었으면 해당 방으로 가야지. /chat/createRoom
    public ResponseEntity<ChatRoomInfo> enterRoom(@RequestBody String instructorId) { // roomName이 아니라 사람 id 하고 엮어야 할 듯
        Authentication authentication = JwtFilter.getAuthentication();
        Instructor instructor = instructorFindService.findById(Long.parseLong(instructorId));
        Student student = studentFindService.findById(authentication.getId());
        log.info("want to know whether to create : instructorId : " + instructorId + " studentId : " + authentication.getId());
        ChatRoom room = chatService.findByStudentIdAndInstructorId(authentication.getId().toString(), instructorId);
        ChatRoomInfo chatRoomInfo;
        if(room == null){
            chatRoomInfo = chatService.createRoom(instructor, student);
            log.info("room created with ID : " + chatRoomInfo.getRoomId());
        }else{
            chatRoomInfo = ChatRoomInfo.from(room);
            log.info("room is already created with id : " + room.getId());
        }
        return ResponseEntity.ok().body(chatRoomInfo);
    }

    @GetMapping("/chat/room")  //방을 만들었으면 해당 방으로 가야지.  /chat/createRoom
    public ResponseEntity<Void> showRoom() {
        return ResponseEntity.ok().build();
    }


    @GetMapping("/chat/enter")   // /chat/chatRoom
    public ResponseEntity<ChatRoom> chatRoom(@RequestParam("roomId") String roomId){
        ChatRoom room = chatService.findRoomById(Long.parseLong(roomId));
        log.info(roomId + "entered");
        return ResponseEntity.ok().body(room);
    }
}
