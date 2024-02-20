package com.drivingtoday.domain.reservation;

import com.drivingtoday.domain.reservation.dto.ReservationRequest;
import lombok.RequiredArgsConstructor;
import org.redisson.api.RLock;
import org.redisson.api.RedissonClient;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class ReservationLockFacade {

    private final ReservationAddService reservationAddService;
    private final RedissonClient redissonClient;

    public Long addReservation(ReservationRequest reservationRequest, Long studentId) {
        if(reservationRequest.getTrainingTime() == 1) {
            RLock lock = redissonClient.getLock(generateLockName(reservationRequest.getReservationDate(),
                    reservationRequest.getReservationTime(), reservationRequest.getInstructorId()));
            try {
                boolean available = lock.tryLock(10, 1, TimeUnit.SECONDS);
                if (!available) {
                    throw new IllegalArgumentException();
                }
                return reservationAddService.addReservation(reservationRequest, studentId);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            } finally {
                lock.unlock();
            }
        }
        else {
            RLock lock1 = redissonClient.getLock(generateLockName(reservationRequest.getReservationDate(),
                    reservationRequest.getReservationTime(), reservationRequest.getInstructorId()));
            RLock lock2 = redissonClient.getLock(generateLockName(reservationRequest.getReservationDate(),
                    reservationRequest.getReservationTime() + 1, reservationRequest.getInstructorId()));
            try {
                boolean available = lock1.tryLock(10, 1, TimeUnit.SECONDS) && lock2.tryLock(10, 1, TimeUnit.SECONDS);
                if (!available) {
                    throw new IllegalArgumentException();
                }
                return reservationAddService.addReservation(reservationRequest, studentId);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            } finally {
                lock1.unlock();
                lock2.unlock();
            }
        }
    }

    private String generateLockName(LocalDate date, Integer time, Long id) {
        return date.toString() + "-" + time + "-" + id;
    }
}
