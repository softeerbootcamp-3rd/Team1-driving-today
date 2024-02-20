package com.drivingtoday.domain.instructor;

import com.drivingtoday.domain.instructor.dto.AvailableInstructorInfo;
import com.drivingtoday.domain.instructor.dto.InstructorDetailResponse;
import com.drivingtoday.domain.instructor.dto.InstructorInfo;
import com.drivingtoday.domain.review.ReviewRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class InstructorFindService {

    private final InstructorRepository instructorRepository;
    private final ReviewRepository reviewRepository;

    @Transactional
    public InstructorDetailResponse findInstructorDetails(Long instructorId) {
        Instructor instructor = instructorRepository.findById(instructorId)
                .orElseThrow(() -> new RuntimeException("해당 강사가 존재하지 않습니다."));
        Double averageRating = reviewRepository.findAverageRatingByInstructorId(instructorId);
        return InstructorDetailResponse.of(instructor, averageRating);
    }

    @Transactional
    public InstructorInfo findInstructor(Long instructorId) {
        Instructor instructor = instructorRepository.findById(instructorId)
                .orElseThrow(() -> new RuntimeException("해당 강사가 존재하지 않습니다."));
        return InstructorInfo.from(instructor);
    }

    @Transactional
    public List<AvailableInstructorInfo> findAvailableInstructors(Double latitude, Double longitude, LocalDate reservationDate,
                                                                  Integer reservationTime, Integer trainingTime, Integer pageNumber, Integer pageSize) {
        return instructorRepository.findAvailableInstructors(reservationDate.toString(), reservationTime, trainingTime,
                latitude, longitude, PageRequest.of(pageNumber - 1, pageSize));
    }

    @Transactional
    public Instructor findById(Long instructorId) {
        Optional<Instructor> instructor = instructorRepository.findById(instructorId);
        if (instructor.isPresent()) {
            return instructor.get();
        }
        throw new RuntimeException("instructor not found with id: " + instructorId);
    }
}
