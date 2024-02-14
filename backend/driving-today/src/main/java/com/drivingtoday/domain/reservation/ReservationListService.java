package com.drivingtoday.domain.reservation;

import com.drivingtoday.domain.reservation.dto.ReservationInstructorResponse;
import com.drivingtoday.domain.reservation.dto.ReservationStudentResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationListService {

    private final ReservationRepository reservationRepository;

    @Transactional
    public List<ReservationStudentResponse> findAllStudentReservation(Long studentId, Integer pageNumber, Integer pageSize){

        List<Reservation> reservationList = reservationRepository.findAllByStudentId(studentId,
                PageRequest.of(pageNumber - 1, pageSize, Sort.by("createdAt").descending())).getContent();

        return reservationList.stream().map(ReservationStudentResponse::from).toList();
    }

    @Transactional
    public List<ReservationInstructorResponse> findAllInstructorReservation(Long instructorId, Integer pageNumber, Integer pageSize){

        List<Reservation> reservationList = reservationRepository.findAllByInstructorId(instructorId,
                PageRequest.of(pageNumber - 1, pageSize, Sort.by("createdAt").descending())).getContent();

        return reservationList.stream().map(ReservationInstructorResponse::from).toList();
    }


}
