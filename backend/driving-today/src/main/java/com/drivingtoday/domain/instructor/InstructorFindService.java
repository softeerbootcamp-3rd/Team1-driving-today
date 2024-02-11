package com.drivingtoday.domain.instructor;

import com.drivingtoday.domain.instructor.dto.InstructorDetailResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.drivingtoday.domain.instructor.dto.AvailableInstructorInfo;
import com.drivingtoday.domain.instructor.dto.AvailableInstructorsRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
@RequiredArgsConstructor
public class InstructorFindService {

    private final InstructorRepository instructorRepository;
    @Transactional
    public InstructorDetailResponse findInstructor(Long instructorId) {
        Instructor instructor = instructorRepository.findById(instructorId)
                .orElseThrow(() -> new RuntimeException("해당 강사가 존재하지 않습니다."));
        return InstructorDetailResponse.from(instructor);
    }

    @Transactional
    public List<AvailableInstructorInfo> findAvailableInstructors(AvailableInstructorsRequest request) {
        List<Instructor> instructorList = instructorRepository.findAvailableInstructors(
                request.getReservationDate().toString(),
                request.getReservationTime(),
                request.getTrainingTime(),
                request.getLatitude(),
                request.getLongitude(),
                PageRequest.of(request.getPageNumber() - 1, request.getPageSize())
                // 0 페이지부터 시작이 default여서 -1 처리
        );

        return instructorList.stream()
                .map(AvailableInstructorInfo::from)
                .toList();
    }
}
