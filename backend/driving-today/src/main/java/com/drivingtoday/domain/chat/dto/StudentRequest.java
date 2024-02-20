package com.drivingtoday.domain.chat.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class StudentRequest {
    @NotNull
    private Long instructorId;
}
