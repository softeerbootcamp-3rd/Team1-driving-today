package com.drivingtoday.domain.chat;

import com.drivingtoday.domain.chat.model.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

    @Query(value = "SELECT c FROM ChatRoom c JOIN FETCH c.student JOIN FETCH c.instructor WHERE c.student.id = :studentId AND c.instructor.id = :instructorId")
    ChatRoom findByStudentIdAndInstructorId(@Param("studentId") Long studentId, @Param("instructorId") Long instructorId);

    @Query(value = "SELECT c FROM ChatRoom c JOIN FETCH c.student WHERE c.student.id = :studentId")
    List<ChatRoom> findByStudentId(@Param("studentId") Long studentId);

    @Query(value = "SELECT c FROM ChatRoom c JOIN FETCH c.instructor i WHERE i.id = :instructorId")
    List<ChatRoom> findByInstructorId(@Param("instructorId") Long instructorId);
}
