package com.drivingtoday.domain.chat;

import com.drivingtoday.domain.chat.model.ChatRoom;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ChatController {

    private final ChatService chatService;

    @RequestMapping("/chat/rooms")  // /chat/roomList
    public ResponseEntity<List<ChatRoom>> chatList(){
        List<ChatRoom> roomList = chatService.findAllRoom();
        return ResponseEntity.ok().body(roomList);
    }

    @PostMapping("/chat/room")  //방을 만들었으면 해당 방으로 가야지. /chat/createRoom
    public ResponseEntity<Void> createRoom(@RequestBody String roomName) { // roomName이 아니라 사람 id 하고 엮어야 할 듯
        ChatRoom room = chatService.createRoom(roomName);
        System.out.println("roomname:  "+ roomName);
        System.out.println("CREATED ROOM ID: " + room.getRoomId());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/chat/room")  //방을 만들었으면 해당 방으로 가야지.  /chat/createRoom
    public ResponseEntity<Void> showRoom() {
        return ResponseEntity.ok().build();
    }

    @GetMapping("/chat/enter")   // /chat/chatRoom
    public ResponseEntity<ChatRoom> chatRoom(@RequestParam("roomId") String roomId){
        ChatRoom room = chatService.findRoomById(roomId);
        System.out.println(roomId + "entered");
        return ResponseEntity.ok().body(room);
    }
}
