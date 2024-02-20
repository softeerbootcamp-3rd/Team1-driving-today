package com.drivingtoday.domain.reservation;

import com.drivingtoday.domain.reservation.dto.ReservationRequest;
import com.drivingtoday.domain.reservation.exception.ReservationException;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
public class ReservationConcurrencyTest {

    @Autowired ReservationAddService reservationAddService;
    @Autowired ReservationRepository reservationRepository;
    @Autowired ReservationLockFacade reservationLockFacade;

    @Test
    @Transactional
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
    @Transactional
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

    @Test
    @Transactional
    @DisplayName("동시에 100명이 같은 내용의 예약을 요청할 때 가장 처음에 요청한 사람의 예약이 성공해야 한다.")
    void FCFS_실험() throws InterruptedException {
        ExecutorService executorService = Executors.newFixedThreadPool(100);
        CountDownLatch countDownLatch = new CountDownLatch(100);
        AtomicInteger count = new AtomicInteger(0);
        AtomicLong firstThreadId = new AtomicLong(0L);
        AtomicLong successThreadId = new AtomicLong(10L);

        for (int i = 0; i < 100; i++) {
            int sequence = i;
            executorService.submit(() -> {
                if(sequence ==0){
                    firstThreadId.set(Thread.currentThread().getId());
                }
                try {
                    ReservationRequest reservationRequest =
                            new ReservationRequest(LocalDate.of(2026, 3, 17),
                                    9,  2, 2L);

                    reservationLockFacade.addReservation(reservationRequest, 2L);
                    successThreadId.set(Thread.currentThread().getId());
                } catch (ReservationException e) {
                    count.incrementAndGet();
                } finally {
                    countDownLatch.countDown();
                }
            });
        }
        countDownLatch.await();

        //이거 바꾸는게 좋아보임
        List<Reservation> reservations = reservationRepository.findAllByInstructorId(2L);
        assertThat(reservations.size()).isEqualTo(1);
        assertThat(successThreadId).isEqualTo(firstThreadId);
        assertThat(successThreadId.get()).isEqualTo(firstThreadId.get());
    }

}
