package com.drivingtoday.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_id")
    private Long id;

    @Column(name = "name")
    @NotNull
    private String name;


    @Column(name = "phone_number")
    @NotNull
    private String phoneNumber;


    @Column(name = "student_image")
    private String studentImage;


    @Column(name = "nickname")
    @NotNull
    private String nickname;




}