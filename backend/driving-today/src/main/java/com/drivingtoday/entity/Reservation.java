package com.drivingtoday.entity;

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
@Getter
@Builder
@AllArgsConstructor
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reservation_id")
    private Long id;

    @Column(name = "status")
    @NotNull
    private Boolean status;

    @Column(name = "created_at")
    @NotNull
    private LocalDateTime createdAt;

    @Column(name = "reservation_date")
    @NotNull
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
}
