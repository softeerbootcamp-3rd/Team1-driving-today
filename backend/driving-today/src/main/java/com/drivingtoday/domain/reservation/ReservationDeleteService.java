package com.drivingtoday.domain.reservation;

import com.drivingtoday.domain.reservation.exception.ReservationErrorCode;
import com.drivingtoday.domain.reservation.exception.ReservationException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReservationDeleteService {

    private final ReservationRepository reservationRepository;

    @Transactional
    public void cancelStudentReservation(Long reservationId, Long studentId) {

        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> ReservationException.from(ReservationErrorCode.RESERVATION_NOT_EXISTS));

        // 예약 지우려는 사람과 예약자와 동일하지 않으면 예외 발생
        if (!reservation.getStudent().getId().equals(studentId)) {
            throw ReservationException.from(ReservationErrorCode.INVALID_DELETE_REQUEST);
        }

        reservation.reject();
    }

    @Transactional
    public void rejectInstructorReservation(Long reservationId, Long instructorId) {

        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> ReservationException.from(ReservationErrorCode.RESERVATION_NOT_EXISTS));

        // 예약 지우려는 강사와 예약자와 동일하지 않으면 예외 발생
        if (!reservation.getInstructor().getId().equals(instructorId)) {
            throw ReservationException.from(ReservationErrorCode.INVALID_DELETE_REQUEST);
        }

        reservation.reject();
    }

}
