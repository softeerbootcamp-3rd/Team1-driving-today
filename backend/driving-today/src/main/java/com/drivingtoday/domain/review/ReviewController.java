package com.drivingtoday.domain.review;

import com.drivingtoday.domain.review.dto.ReviewFindRequest;
import com.drivingtoday.domain.review.dto.ReviewInfo;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewFindService reviewFindService;

    @GetMapping("/reviews")
    @Operation(summary = "특정 강사에 대한 리뷰들 가져오기 API")
    public ResponseEntity<List<ReviewInfo>> reviewList(@Valid @ModelAttribute ReviewFindRequest request) {
        List<ReviewInfo> reviews = reviewFindService.findReviews(request);
        return ResponseEntity.ok(reviews);
    }
}
