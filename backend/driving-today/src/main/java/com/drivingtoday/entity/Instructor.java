package com.drivingtoday.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@NoArgsConstructor
@Getter
public class Instructor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "instructor_id")
    private Long id;

    @Column(name = "name")
    @NotNull
    private String name;

    @Column(name = "phone_number")
    @NotNull
    private String phoneNumber;

    @Column(name = "instructor_image")
    @NotNull
    private String instructorImage;

    @Column(name = "price_per_hour")
    @NotNull
    private String pricePerHour;

    @Column(name = "introduction")
    @NotNull
    private String introduction;

    @ManyToOne
    @JoinColumn(name = "academy_id")
    private Academy academy;
}