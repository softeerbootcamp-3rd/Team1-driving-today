package com.drivingtoday.domain.reservation;

import com.drivingtoday.domain.instructor.Instructor;
import com.drivingtoday.domain.review.Review;
import com.drivingtoday.domain.student.Student;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reservation_id")
    private Long id;

    @Column(name = "is_accepted", columnDefinition = "TINYINT(1)")
    @NotNull
    private Boolean isAccepted;

    @Column(name = "created_at")
    @NotNull
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    @Column(name = "reservation_date")
    @NotNull
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate reservationDate;

    @Column(name = "reservation_time")
    @NotNull
    private Integer reservationTime;

    @Column(name = "training_time")
    @NotNull
    private Integer trainingTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "instructor_id")
    private Instructor instructor;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "review_id")
    @JsonIgnore
    private Review review;

    @Builder
    public Reservation(Integer reservationTime, Integer trainingTime, Student student, Instructor instructor, LocalDate reservationDate) {
        this.isAccepted = true;
        this.reservationTime = reservationTime;
        this.trainingTime = trainingTime;
        this.student = student;
        this.instructor = instructor;
        this.createdAt = LocalDateTime.now();
        this.reservationDate = reservationDate;
    }


    public void reject() {
        this.isAccepted = false;
    }

    public void registerReview(Review review) {
        this.review = review;
    }
}
