package com.drivingtoday.domain.review;

import com.drivingtoday.domain.review.dto.ReviewFindRequest;
import com.drivingtoday.domain.review.dto.ReviewInfo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewFindService {

    private final ReviewRepository reviewRepository;

    @Transactional
    public List<ReviewInfo> findReviews(ReviewFindRequest request) {
        // 페이지 번호 1부터 입력받게 설정, 최신 순으로 정렬해서 반환
        List<Review> reviews = reviewRepository.findAllByInstructorId(request.getInstructorId(),
                PageRequest.of(request.getPageNumber() - 1, request.getPageSize(),
                        Sort.by("createdAt").descending())).getContent();
        return reviews.stream().map(ReviewInfo::from).toList();
    }
}
