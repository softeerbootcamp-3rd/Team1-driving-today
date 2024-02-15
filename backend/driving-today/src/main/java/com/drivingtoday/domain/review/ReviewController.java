package com.drivingtoday.domain.review;


import com.drivingtoday.domain.review.dto.ReviewFindRequest;
import com.drivingtoday.domain.review.dto.ReviewInfo;
import com.drivingtoday.domain.review.dto.ReviewRequest;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.net.URI;

@RestController
@RequiredArgsConstructor
@Slf4j
public class ReviewController {
    private final ReviewFindService reviewFindService;
    private final ReviewAddService reviewAddService;

    @Operation(summary = "특정 강사에 대한 리뷰들 조회 API")
    @GetMapping("/reviews")
    public ResponseEntity<List<ReviewInfo>> reviewList(@Valid @ModelAttribute ReviewFindRequest request) {
        log.info("dto: {}", request.getInstructorId());
        List<ReviewInfo> reviews = reviewFindService.findReviews(request);
        return ResponseEntity.ok(reviews);
    }
    
    @Operation(summary = "리뷰 등록하기 API")
    @PostMapping("/review")
    public ResponseEntity<Void> reviewAdd(@RequestBody @Valid ReviewRequest reviewRequest) {
        Long newReviewId = reviewAddService.addReview(reviewRequest);
        return ResponseEntity.created(URI.create("/reviews/" + newReviewId)).build();
    }
}
