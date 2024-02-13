package com.drivingtoday.domain.reservation.dto;


import com.drivingtoday.domain.instructor.dto.InstructorInfo;
import com.drivingtoday.domain.reservation.Reservation;
import com.drivingtoday.domain.student.dto.StudentInfo;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ReservationDetailResponse {

    private ReservationInfo reservationInfo;
    private InstructorInfo instructorInfo;
    private StudentInfo studentInfo;

    public static ReservationDetailResponse from(Reservation reservation){
        return ReservationDetailResponse.builder()
                .reservationInfo(ReservationInfo.from(reservation))
                .instructorInfo(InstructorInfo.from(reservation.getInstructor()))
                .studentInfo(StudentInfo.from(reservation.getStudent()))
                .build();
    }

}
