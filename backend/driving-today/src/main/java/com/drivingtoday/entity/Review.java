package com.drivingtoday.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@NoArgsConstructor
@Getter
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private Long id;

    @Column(name = "contents")
    private String contents;

    @Column(name = "rating")
    @NotNull
    private Double rating;

    @Column(name = "createdAt")
    @NotNull
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "student_id")
    @NotNull
    private Student student;

    @ManyToOne
    @JoinColumn(name = "instructor_id")
    @NotNull
    private Instructor instructor;

}