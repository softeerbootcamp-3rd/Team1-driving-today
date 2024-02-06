package com.drivingtoday.Controller;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.web.bind.annotation.GetMapping;

public class TestController {

    @Operation(summary = "swagger test")
    @GetMapping("/")
    public String swaggerTest(){
        System.out.println("zz");
        return "test";
    }

}
