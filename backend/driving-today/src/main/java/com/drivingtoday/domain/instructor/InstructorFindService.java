package com.drivingtoday.domain.instructor;

import com.drivingtoday.domain.instructor.dto.InstructorDetailResponse;
import com.drivingtoday.domain.review.ReviewRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.drivingtoday.domain.instructor.dto.AvailableInstructorInfo;
import com.drivingtoday.domain.instructor.dto.AvailableInstructorsRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class InstructorFindService {

    private final InstructorRepository instructorRepository;
    private final ReviewRepository reviewRepository;
    @Transactional
    public InstructorDetailResponse findInstructor(Long instructorId) {
        Instructor instructor = instructorRepository.findById(instructorId)
                .orElseThrow(() -> new RuntimeException("해당 강사가 존재하지 않습니다."));
        Double averageRating = reviewRepository.findAverageRatingByInstructorId(instructorId);
        return InstructorDetailResponse.of(instructor, averageRating);
    }

    @Transactional
    public List<AvailableInstructorInfo> findAvailableInstructors(AvailableInstructorsRequest request) {
        return instructorRepository.findAvailableInstructors(
                request.getReservationDate().toString(),
                request.getReservationTime(),
                request.getTrainingTime(),
                request.getLatitude(),
                request.getLongitude(),
                PageRequest.of(request.getPageNumber() - 1, request.getPageSize())
                // 0 페이지부터 시작이 default여서 -1 처리
        );
    }

    @Transactional
    public Instructor findById(Long instructorId){
        Optional<Instructor> instructor = instructorRepository.findById(instructorId);
        if (instructor.isPresent()) {
            return instructor.get();
        }
        throw new RuntimeException("instructor not found with id: " + instructorId);
    }
}
