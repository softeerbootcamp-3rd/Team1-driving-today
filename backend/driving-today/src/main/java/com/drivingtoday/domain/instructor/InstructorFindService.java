package com.drivingtoday.domain.instructor;

import com.drivingtoday.domain.instructor.dto.InstructorDetailResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
}
