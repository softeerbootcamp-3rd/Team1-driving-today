package com.drivingtoday.domain.chat;

import com.drivingtoday.domain.chat.ChatRoom;
import com.drivingtoday.domain.chat.model.ChatMessage;
import com.drivingtoday.domain.chat.model.ChatRoomInfo;
import com.drivingtoday.domain.chat.model.ChatRoomInfoDetail;
import com.drivingtoday.domain.instructor.Instructor;
import com.drivingtoday.domain.instructor.InstructorFindService;
import com.drivingtoday.domain.student.Student;
import com.drivingtoday.domain.student.StudentFindService;
import com.drivingtoday.global.auth.config.JwtFilter;
import com.drivingtoday.global.auth.constants.Authentication;
import com.drivingtoday.global.auth.constants.Role;
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
    private final ChatMessageService chatMessageService;

    @Operation(summary = "강사가 본인한테 온 메시지 톡방들 리스트화")
    @RequestMapping("/my/rooms")  // /chat/roomList
    public ResponseEntity<List<ChatRoomInfoDetail>> chatListInstructor(){
        Authentication authentication = JwtFilter.getAuthentication();
        if(authentication.getRole().equals("STUDENT")){
            throw new RuntimeException("잘못된 접근");
        }
        List<ChatRoomInfo> roomInfoList = chatService.findByInstructorId(authentication.getId().toString());
        List<ChatRoomInfoDetail> chatRoomInfoDetailList = roomInfoList.stream().map(chatRoomInfo ->{
            List<ChatMessage> chatMessageList = chatMessageService.findAllChatMessageByRoomId(chatRoomInfo.getRoomId());
            return ChatRoomInfoDetail.from(chatRoomInfo, chatMessageList);
        }).toList();
        return ResponseEntity.ok().body(chatRoomInfoDetailList);
    }

    @Operation(summary = "학생이 강사 채팅 버튼 눌러서 방 만들거나 이미 있던 방 들어가기")
    @PostMapping("/student/enter")
    public ResponseEntity<ChatRoomInfoDetail> enterRoomByStudent(@RequestBody String instructorId) {

        Authentication authentication = JwtFilter.getAuthentication();
        Instructor instructor = instructorFindService.findById(Long.parseLong(instructorId));

        Student student = studentFindService.findById(authentication.getId());

        log.info("want to know whether to create : instructorId : " + instructorId + " studentId : " + authentication.getId());
        ChatRoom room = chatService.findByStudentIdAndInstructorId(authentication.getId().toString(), instructorId);
        ChatRoomInfo chatRoomInfo;
        ChatRoomInfoDetail chatRoomInfoDetail;

        if(room == null){
            chatRoomInfo = chatService.createRoom(instructor, student);
            chatRoomInfoDetail = ChatRoomInfoDetail.from(chatRoomInfo, null);
            log.info("room created with ID : " + chatRoomInfo.getRoomId());
        }else{

            List<ChatMessage> chatMessageList = chatMessageService.findAllChatMessageByRoomId(room.getId().toString());
            chatRoomInfo = ChatRoomInfo.from(room);
            chatRoomInfoDetail = ChatRoomInfoDetail.from(chatRoomInfo, chatMessageList);
            log.info("room is already created with id : " + room.getId());
        }
        return ResponseEntity.ok().body(chatRoomInfoDetail);
    }

    @Operation(summary = "강사가 학생 채팅 버튼 눌러서 방 만들거나 이미 있던 방 들어가기")
    @PostMapping("/instructor/enter")
    public ResponseEntity<ChatRoomInfoDetail> enterRoomByInstructor(@RequestBody String studentId) {

        Authentication authentication = JwtFilter.getAuthentication();
        Student student = studentFindService.findById(Long.parseLong(studentId));
        Instructor instructor = instructorFindService.findById(authentication.getId());

        log.info("instructor enters student ID : " + studentId);
        ChatRoom room = chatService.findByStudentIdAndInstructorId(studentId, authentication.getId().toString());

        List<ChatMessage> chatMessageList = chatMessageService.findAllChatMessageByRoomId(room.getId().toString());
        ChatRoomInfo chatRoomInfo = ChatRoomInfo.from(room);
        ChatRoomInfoDetail chatRoomInfoDetail = ChatRoomInfoDetail.from(chatRoomInfo, chatMessageList);

        return ResponseEntity.ok().body(chatRoomInfoDetail);
    }

    @GetMapping("/chat/enter")
    public ResponseEntity<ChatRoom> chatRoom(@RequestParam("roomId") String roomId){
        ChatRoom room = chatService.findRoomById(Long.parseLong(roomId));
        log.info(roomId + "entered");
        return ResponseEntity.ok().body(room);
    }
}
