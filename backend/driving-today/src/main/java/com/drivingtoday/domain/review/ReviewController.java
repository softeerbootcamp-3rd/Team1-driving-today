package com.drivingtoday.domain.review;

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

    private final ReviewAddService reviewAddService;

    @Operation(summary = "리뷰 등록하기 API")
    @PostMapping
    public ResponseEntity<Void> reviewAdd(@RequestBody @Valid ReviewRequest reviewRequest) {
        Long newReviewId = reviewAddService.addReview(reviewRequest);
        return ResponseEntity.created(URI.create("/reviews/" + newReviewId)).build();
    }
}
