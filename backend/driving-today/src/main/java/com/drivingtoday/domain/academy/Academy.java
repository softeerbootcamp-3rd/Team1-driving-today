package com.drivingtoday.domain.academy;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@NoArgsConstructor
@Getter
public class Academy {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "academy_id")
    private Long id;

    @Column(name = "name")
    @NotNull
    private String name;

    @Column(name = "latitude")
    @NotNull
    private Double latitude;

    @Column(name = "longitude")
    @NotNull
    private Double longitude;

    @Column(name = "cert", columnDefinition = "TINYINT(1)")
    @NotNull
    private Boolean cert;

    @Builder
    private Academy(String name, Double latitude, Double longitude, Boolean cert){
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.cert = cert;
    }

}
