package com.drivingtoday.ReservationTest;

import com.drivingtoday.DTO.ReservationDTO;
import com.drivingtoday.entity.Academy;
import com.drivingtoday.entity.Instructor;
import com.drivingtoday.entity.Student;
import com.drivingtoday.repository.AcademyRepository;
import com.drivingtoday.repository.InstructorRepository;
import com.drivingtoday.repository.ReservationRepository;
import com.drivingtoday.repository.StudentRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.Optional;


@SpringBootTest
@AutoConfigureMockMvc
public class ReservationControllerTest {

    @Autowired
    protected MockMvc mockMvc;

    @Autowired
    protected ObjectMapper objectMapper;

    @Autowired
    private WebApplicationContext context;

    @Autowired
    private ReservationRepository reservationRepository;

    @BeforeEach
    public void mockMvcSetUp() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(context)
                .build();
        reservationRepository.deleteAll();
    }

    @AfterEach
    public void afterTest(){
        reservationRepository.deleteAll();
    }

    @DisplayName("create reservation : 예약 생성에 성공한다.")
    @Test
    void createReservationTest() throws Exception {

    }
}
