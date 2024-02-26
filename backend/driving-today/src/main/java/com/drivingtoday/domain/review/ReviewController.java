package com.drivingtoday.domain.review;

import com.drivingtoday.domain.review.dto.ReviewRequest;
import com.drivingtoday.domain.review.dto.ReviewInfo;
import com.drivingtoday.global.auth.config.JwtFilter;
import com.drivingtoday.global.auth.constants.Authentication;
import com.drivingtoday.global.dto.SliceResponse;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URI;

@RestController
@RequiredArgsConstructor
@Slf4j
public class ReviewController {

    private final ReviewFindService reviewFindService;
    private final ReviewAddService reviewAddService;

    @Operation(summary = "[학생] 특정 강사에 대한 리뷰들 조회 API")
    @GetMapping("/reviews")
    public ResponseEntity<SliceResponse<ReviewInfo>> reviewList(@RequestParam("instructorId") Long instructorId,
                                                                @RequestParam("pageNumber") Integer pageNumber,
                                                                @RequestParam("pageSize") Integer pageSize) {
        SliceResponse<ReviewInfo> reviews = reviewFindService.findReviews(instructorId, pageNumber, pageSize);
        return ResponseEntity.ok(reviews);
    }

    @Operation(summary = "[학생] 리뷰 등록하기 API")
    @PostMapping("/review")
    public ResponseEntity<Void> reviewAdd(@RequestBody ReviewRequest reviewRequest) {
        Authentication authentication = JwtFilter.getAuthentication();
        Long newReviewId = reviewAddService.addReview(reviewRequest, authentication.getId());
        return ResponseEntity.created(URI.create("/reviews/" + newReviewId)).build();
    }
}