package com.drivingtoday.domain.instructor;

import com.drivingtoday.domain.academy.Academy;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class Instructor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "instructor_id")
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

    @Column(name = "instructor_image")
    @NotNull
    private String instructorImage;

    @Column(name = "price_per_hour")
    @NotNull
    private Integer pricePerHour;

    @Column(name = "introduction")
    @NotNull
    private String introduction;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "academy_id")
    @NotNull
    private Academy academy;


}
