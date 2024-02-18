package com.drivingtoday.domain.chat;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

    @Query(value = "SELECT * FROM chat_room WHERE student_id = :studentId AND instructor_id = :instructorId", nativeQuery = true)
    ChatRoom findByStudentIdAndInstructorId(@Param("studentId") String studentId, @Param("instructorId") String instructorId);

    @Query(value = "SELECT * FROM chat_room WHERE student_id = :studentId", nativeQuery = true)
    ChatRoom findByStudentId(@Param("studentId") String studentId);

    @Query(value = "SELECT * FROM chat_room WHERE instructor_id = :instructorId", nativeQuery = true)
    ChatRoom findByInstructorId(@Param("instructorId") String instructorId);


}
