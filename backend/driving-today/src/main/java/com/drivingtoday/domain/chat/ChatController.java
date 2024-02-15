package com.drivingtoday.domain.chat;

import com.drivingtoday.domain.chat.model.ChatRoom;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ChatController {

    private final ChatService chatService;

    @RequestMapping("/chat/roomList")
    public ResponseEntity<List<ChatRoom>> chatList(){
        List<ChatRoom> roomList = chatService.findAllRoom();
        return ResponseEntity.ok().body(roomList);
    }

    @PostMapping("/chat/createRoom")  //방을 만들었으면 해당 방으로 가야지.
    public ResponseEntity<Void> createRoom(@RequestBody String roomName) {
        ChatRoom room = chatService.createRoom(roomName);
        System.out.println("roomname:  "+ roomName);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/chat/createRoom")  //방을 만들었으면 해당 방으로 가야지.
    public ResponseEntity<Void> showRoom() {
        return ResponseEntity.ok().build();
    }  /// <- 이건 안씀

    @GetMapping("/chat/chatRoom")
    public ResponseEntity<ChatRoom> chatRoom(Model model, @RequestParam("roomId") String roomId){
        ChatRoom room = chatService.findRoomById(roomId);
        System.out.println(roomId + "entered");
        return ResponseEntity.ok().body(room);
    }
}
