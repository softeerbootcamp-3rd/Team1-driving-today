package com.drivingtoday.domain.review;

import com.drivingtoday.domain.instructor.Instructor;
import com.drivingtoday.domain.reservation.Reservation;
import com.drivingtoday.domain.student.Student;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @Builder
    private Review(String contents, Double rating, Student student, Instructor instructor, Reservation reservation) {
        this.contents = contents;
        this.rating = rating;
        this.student = student;
        this.instructor = instructor;
        this.createdAt = LocalDateTime.now();
        this.reservation = reservation;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private Long id;

    @Column(name = "contents")
    private String contents;

    @Column(name = "rating")
    @NotNull
    private Double rating;

    @Column(name = "created_at")
    @NotNull
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    @NotNull
    @JsonIgnore
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "instructor_id")
    @NotNull
    @JsonIgnore
    private Instructor instructor;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reservation_id")
    @NotNull
    @JsonIgnore
    private Reservation reservation;
}

