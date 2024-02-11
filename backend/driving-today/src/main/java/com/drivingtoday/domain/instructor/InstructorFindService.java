package com.drivingtoday.domain.instructor;

import com.drivingtoday.domain.instructor.dto.InstructorDetailResponse;
import com.drivingtoday.domain.review.Review;
import com.drivingtoday.domain.review.ReviewRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InstructorFindService {

    private final InstructorRepository instructorRepository;
    private final ReviewRepository reviewRepository;

    @Transactional
    public InstructorDetailResponse findInstructor(Long instructorId, Integer pageNumber, Integer pageSize) {
        Instructor instructor = instructorRepository.findById(instructorId)
                .orElseThrow(() -> new RuntimeException("해당 강사가 존재하지 않습니다."));

        // 페이지 번호 1부터 시작, 최근 생성 순으로 정렬
        List<Review> reviews = reviewRepository.findAllByInstructorId(instructorId,
                        PageRequest.of(pageNumber - 1, pageSize,
                                Sort.by("createdAt").descending())).getContent();

        return InstructorDetailResponse.of(instructor, reviews);
    }
}

