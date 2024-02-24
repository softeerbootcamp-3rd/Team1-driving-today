package com.drivingtoday.domain.chat;

import com.drivingtoday.domain.chat.dto.*;
import com.drivingtoday.domain.chat.model.*;
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
@RequestMapping("/chat")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ChatController {

    private final ChatService chatService;
    private final InstructorFindService instructorFindService;
    private final StudentFindService studentFindService;
    private final ChatMessageService chatMessageService;

    @Operation(summary = "강사가 본인한테 온 메시지 톡방들 리스트화")
    @GetMapping("/instructor/rooms")
    public ResponseEntity<List<ChatRoomInfoConcise>> chatListInstructor(){
        Authentication authentication = JwtFilter.getAuthentication();
        if(authentication.getRole().equals("STUDENT")){
            throw new RuntimeException("잘못된 접근");
        }
        List<ChatRoomInfo> roomInfoList = chatService.findByInstructorId(authentication.getId());
        List<ChatRoomInfoConcise> chatRoomInfoConciseList = roomInfoList.stream().map(chatRoomInfo ->{
            List<ChatMessage> chatMessageList = chatMessageService.findAllChatMessageByRoomId(chatRoomInfo.getRoomId());
            return ChatRoomInfoConcise.from(chatRoomInfo, chatMessageList);
        }).toList();
        return ResponseEntity.ok().body(chatRoomInfoConciseList);
    }

    @Operation(summary = "학생이 보낸 메시지 톡방들 리스트화")
    @GetMapping("/student/rooms")  // /chat/roomList
    public ResponseEntity<List<ChatRoomInfoConcise>> chatListStudent(){
        Authentication authentication = JwtFilter.getAuthentication();
        if(authentication.getRole().equals("INSTRUCTOR")){
            throw new RuntimeException("잘못된 접근");
        }
        List<ChatRoomInfo> roomInfoList = chatService.findByStudentId(authentication.getId());
        List<ChatRoomInfoConcise> chatRoomInfoConciseList = roomInfoList.stream().map(chatRoomInfo ->{
            List<ChatMessage> chatMessageList = chatMessageService.findAllChatMessageByRoomId(chatRoomInfo.getRoomId());
            return ChatRoomInfoConcise.from(chatRoomInfo, chatMessageList);
        }).toList();
        return ResponseEntity.ok().body(chatRoomInfoConciseList);
    }

    @Operation(summary = "학생이 강사 채팅 버튼 눌러서 방 만들거나 이미 있던 방 들어가기")
    @PostMapping("/student/enter")
    public ResponseEntity<ChatRoomInfoDetail> enterRoomByStudent(@RequestBody StudentRequest requestBody) {

        Long instructorId = requestBody.getInstructorId();

        Authentication authentication = JwtFilter.getAuthentication();
        Instructor instructor = instructorFindService.findById(instructorId);

        Student student = studentFindService.findById(authentication.getId());
        ChatRoom room = chatService.findByStudentIdAndInstructorId(authentication.getId(), instructorId);
        ChatRoomInfo chatRoomInfo;
        ChatRoomInfoDetail chatRoomInfoDetail;

        if(room == null){
            chatRoomInfo = chatService.createRoom(instructor, student);
            chatRoomInfoDetail = ChatRoomInfoDetail.from(chatRoomInfo, null);
            log.info("room created with ID : " + chatRoomInfo.getRoomId());
        }else{

            List<ChatMessage> chatMessageList = chatMessageService.findAllChatMessageByRoomId(room.getId());
            chatRoomInfo = ChatRoomInfo.from(room);
            chatRoomInfoDetail = ChatRoomInfoDetail.from(chatRoomInfo, chatMessageList);
            log.info("room is already created with id : " + room.getId());
        }
        return ResponseEntity.ok().body(chatRoomInfoDetail);
    }

    @Operation(summary = "강사가 학생 채팅 버튼 눌러서 이미 있던 방 들어가기")
    @PostMapping("/instructor/enter")
    public ResponseEntity<ChatRoomInfoDetail> enterRoomByInstructor(@RequestBody InstructorRequest requestBody) {

        Long studentId = requestBody.getStudentId();

        Authentication authentication = JwtFilter.getAuthentication();
        Student student = studentFindService.findById(studentId);
        Instructor instructor = instructorFindService.findById(authentication.getId());

        log.info("instructor enters student ID : " + studentId);
        ChatRoom room = chatService.findByStudentIdAndInstructorId(studentId, authentication.getId());

        List<ChatMessage> chatMessageList = chatMessageService.findAllChatMessageByRoomId(room.getId());
        ChatRoomInfo chatRoomInfo = ChatRoomInfo.from(room);
        ChatRoomInfoDetail chatRoomInfoDetail = ChatRoomInfoDetail.from(chatRoomInfo, chatMessageList);

        return ResponseEntity.ok().body(chatRoomInfoDetail);
    }
}
