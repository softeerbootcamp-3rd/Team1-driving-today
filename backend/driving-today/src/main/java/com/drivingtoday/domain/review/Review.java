package com.drivingtoday.domain.review;


import com.drivingtoday.domain.instructor.Instructor;
import com.drivingtoday.domain.student.Student;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

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

    @Builder
    private Review(String contents, Double rating, Student student, Instructor instructor) {
        this.contents = contents;
        this.rating = rating;
        this.student = student;
        this.instructor = instructor;
        this.createdAt = LocalDateTime.now();
    }
}
