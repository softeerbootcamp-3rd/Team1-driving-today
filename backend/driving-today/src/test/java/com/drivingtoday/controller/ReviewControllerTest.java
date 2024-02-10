package com.drivingtoday.controller;

import com.drivingtoday.domain.review.ReviewController;
import com.drivingtoday.domain.review.ReviewRequest;
import com.drivingtoday.domain.review.ReviewService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;

@WebMvcTest(controllers = ReviewController.class)
class ReviewControllerTest {
    MockMvc mvc;

    @Autowired
    private WebApplicationContext context;

    @MockBean
    ReviewService reviewService;

    @BeforeEach
    public void setup() {
        this.mvc = MockMvcBuilders.webAppContextSetup(context)
                .addFilter(new CharacterEncodingFilter("UTF-8", true))
                .build();
    }

    @DisplayName("유효하지 않은 RequestBody가 들어왔을 때 에러 발생한다.")
    @Test
    void invalidRequestBody() {
        //given
        ReviewRequest request = new ReviewRequest();
        //when

        //then
    }
}
