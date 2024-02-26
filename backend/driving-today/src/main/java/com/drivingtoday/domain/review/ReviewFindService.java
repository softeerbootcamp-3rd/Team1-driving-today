package com.drivingtoday.domain.review;

import com.drivingtoday.domain.review.dto.ReviewInfo;
import com.drivingtoday.global.dto.SliceResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReviewFindService {

    private final ReviewRepository reviewRepository;

    @Transactional
    public SliceResponse<ReviewInfo> findReviews(Long instructorId, Integer pageNumber, Integer pageSize) {
        // 페이지 번호 1부터 입력받게 설정, 최신 순으로 정렬해서 반환
        Slice<Review> reviews = reviewRepository.findAllByInstructorId(instructorId, PageRequest.of(pageNumber - 1, pageSize,
                Sort.by("createdAt").descending()));

        List<ReviewInfo> reviewInfoList = new ArrayList<>();

        for (Review review : reviews.getContent()) {
            ReviewInfo reviewInfo = ReviewInfo.from(review);
            reviewInfoList.add(reviewInfo);
        }

        return new SliceResponse<>(reviewInfoList, reviews.getNumber(), reviews.getSize(), reviews.isFirst(), reviews.isLast());
    }
}