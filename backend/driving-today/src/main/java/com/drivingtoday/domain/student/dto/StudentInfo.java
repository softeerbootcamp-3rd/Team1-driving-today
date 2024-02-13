package com.drivingtoday.domain.student.dto;

import com.drivingtoday.domain.student.Student;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class StudentInfo {
    private String name;
    private String phoneNumber;
    private String studentImage;
    private String nickname;

    public static StudentInfo from(Student student) {
        return StudentInfo.builder()
                .name(student.getName())
                .phoneNumber(student.getPhoneNumber())
                .studentImage(student.getStudentImage())
                .nickname(student.getNickname())
                .build();
    }
}

