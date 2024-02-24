package com.drivingtoday.domain.reservation;

import com.drivingtoday.domain.reservation.dto.ReservationStudentResponse;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.StopWatch;

import java.util.List;

@SpringBootTest
@Slf4j
@Transactional
class ReservationListServiceFetchJoinTest {
    @Autowired
    ReservationListService listService;

//    @Test
//    @DisplayName("fetch join을 하기 전, Lazy Loading으로 연관관계 호출할 때 걸리는 시간")
//    void before_fetch_join(){
//        StopWatch stopWatch = new StopWatch();
//        stopWatch.start();
//        List<ReservationStudentResponse> reservations = listService.findAllStudentReservation1(1L, "scheduled");
//        stopWatch.stop();
//        log.info(stopWatch.getTotalTimeMillis() + "ms");
//    }

//    @Test
//    @DisplayName("fetch join 후, 걸리는 시간")
//    void after_fetch_join(){
//        StopWatch stopWatch = new StopWatch();
//        stopWatch.start();
//        List<ReservationStudentResponse> reservations = listService.findAllStudentReservation2(1L, "scheduled");
//        stopWatch.stop();
//        log.info(stopWatch.getTotalTimeMillis() + "ms");
//    }
}