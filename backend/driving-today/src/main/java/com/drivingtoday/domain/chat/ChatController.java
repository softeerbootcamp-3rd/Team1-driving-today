package com.drivingtoday.domain.chat;

import com.drivingtoday.domain.chat.ChatRoom;
import com.drivingtoday.domain.chat.model.ChatRoomInfo;
import com.drivingtoday.domain.instructor.Instructor;
import com.drivingtoday.domain.instructor.InstructorFindService;
import com.drivingtoday.domain.student.Student;
import com.drivingtoday.domain.student.StudentFindService;
import com.drivingtoday.global.auth.config.JwtFilter;
import com.drivingtoday.global.auth.constants.Authentication;
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

    /*
    @RequestMapping("/chat/rooms")  // /chat/roomList
    public ResponseEntity<List<ChatRoom>> chatList(){
        List<ChatRoom> roomList = chatService.findAllRoom();
        return ResponseEntity.ok().body(roomList);
    }

     */

    @PostMapping("/chat/room")  //방을 만들었으면 해당 방으로 가야지. /chat/createRoom
    public ResponseEntity<ChatRoomInfo> createRoom(@RequestBody String instructorId) { // roomName이 아니라 사람 id 하고 엮어야 할 듯
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
            chatRoomInfo = ChatRoomInfo.from(room, student.getId().toString());
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
