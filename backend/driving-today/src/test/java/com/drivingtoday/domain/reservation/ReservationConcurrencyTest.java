package com.drivingtoday.domain.reservation;

import com.drivingtoday.domain.reservation.dto.ReservationRequest;
import com.drivingtoday.domain.reservation.exception.ReservationException;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicInteger;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
public class ReservationConcurrencyTest {

    @Autowired ReservationAddService reservationAddService;
    @Autowired ReservationRepository reservationRepository;
    @Autowired ReservationLockFacade reservationLockFacade;

    @Test
    public void 동시에_100명이_겹치는_시간대_예약_요청_동시성_처리X() throws InterruptedException {
        ExecutorService executorService = Executors.newFixedThreadPool(100);
        CountDownLatch countDownLatch = new CountDownLatch(100);
        AtomicInteger count = new AtomicInteger(0);

        for (int i = 0; i < 100; i++) {
            executorService.submit(() -> {
                try {
                    ReservationRequest reservationRequest =
                            new ReservationRequest(LocalDate.of(2024, 3, 17),
                                    9,  2, 2L);

                    reservationAddService.addReservation(reservationRequest, 2L);
                } catch (ReservationException e) {
                    count.incrementAndGet();
                } finally {
                    countDownLatch.countDown();
                }
            });
        }
        countDownLatch.await();

        List<Reservation> reservations = reservationRepository.findAllByInstructorId(2L);
        assertThat(reservations.size()).isNotEqualTo(1);
        assertThat(reservations.size()).isEqualTo(100- count.get());
    }

    @Test
    public void 동시성_처리_이후() throws InterruptedException {
        ExecutorService executorService = Executors.newFixedThreadPool(100);
        CountDownLatch countDownLatch = new CountDownLatch(100);
        AtomicInteger count = new AtomicInteger(0);

        for (int i = 0; i < 100; i++) {
            executorService.submit(() -> {
                try {
                    ReservationRequest reservationRequest =
                            new ReservationRequest(LocalDate.of(2024, 3, 17),
                                    9,  2, 2L);

                    reservationLockFacade.addReservation(reservationRequest, 2L);
                } catch (ReservationException e) {
                    count.incrementAndGet();
                } finally {
                    countDownLatch.countDown();
                }
            });
        }
        countDownLatch.await();

        List<Reservation> reservations = reservationRepository.findAllByInstructorId(2L);
        assertThat(reservations.size()).isEqualTo(1);
    }
}
