package com.drivingtoday.domain.student;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Student {
    @Builder
    public Student(String name, String email, String password, String phoneNumber, String nickname, String studentImage) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.nickname = nickname;
        this.studentImage = studentImage;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_id")
    private Long id;

    @Column(name = "name")
    @NotNull
    private String name;

    @Column(name = "email")
    @NotNull
    private String email;

    @Column(name = "password")
    @NotNull
    private String password;

    @Column(name = "phone_number")
    @NotNull
    private String phoneNumber;

    @Column(name = "student_image")
    private String studentImage;

    @Column(name = "nickname")
    @NotNull
    private String nickname;

    @Builder
    public Student(String name, String phoneNumber, String studentImage, String nickname){
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.studentImage = studentImage;
        this.nickname = nickname;
    }

}
