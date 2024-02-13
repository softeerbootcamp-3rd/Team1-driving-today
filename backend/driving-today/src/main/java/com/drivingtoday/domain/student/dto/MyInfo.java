package com.drivingtoday.domain.student.dto;

import com.drivingtoday.domain.student.Student;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MyInfo {

    private String name;
    private String studentImage;
    private String nickname;

    public static MyInfo from(Student student){
        return MyInfo.builder()
                .name(student.getName())
                .studentImage(student.getStudentImage())
                .nickname(student.getNickname())
                .build();
    }
}
