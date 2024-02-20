package com.drivingtoday.domain.chat;

import com.drivingtoday.domain.chat.model.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

    @Query(value = "SELECT * FROM chat_room WHERE student_id = :studentId AND instructor_id = :instructorId", nativeQuery = true)
    ChatRoom findByStudentIdAndInstructorId(@Param("studentId") String studentId, @Param("instructorId") String instructorId);

    @Query(value = "SELECT * FROM chat_room WHERE student_id = :studentId", nativeQuery = true)
    List<ChatRoom> findByStudentId(@Param("studentId") String studentId);

    @Query(value = "SELECT * FROM chat_room WHERE instructor_id = :instructorId", nativeQuery = true)
    List<ChatRoom> findByInstructorId(@Param("instructorId") String instructorId);
}
