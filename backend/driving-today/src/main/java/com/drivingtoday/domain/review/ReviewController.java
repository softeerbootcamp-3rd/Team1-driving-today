package com.drivingtoday.domain.review;

import com.drivingtoday.domain.review.ReviewRequest;
import com.drivingtoday.domain.review.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController("/review")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @Operation(summary = "리뷰 등록하기 API")
    @PostMapping
    public ResponseEntity<Void> reviewAdd(@RequestBody @Valid ReviewRequest reviewRequest) {
        Long newReviewId = reviewService.addReview(reviewRequest);
        return ResponseEntity.created(URI.create("/reviews/" + newReviewId)).build();
    }
}
