package com.drivingtoday.global.config;

import com.drivingtoday.global.auth.config.JwtFilter;
import com.drivingtoday.global.auth.jwt.JwtProvider;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Bean
    public FilterRegistrationBean<OncePerRequestFilter> jwtFilterfilter(JwtProvider jwtProvider){
        FilterRegistrationBean<OncePerRequestFilter> filterRegistrationBean = new FilterRegistrationBean<>();
        filterRegistrationBean.setFilter(new JwtFilter(jwtProvider));
        filterRegistrationBean.setOrder(1);
        return filterRegistrationBean;
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("*");
    }

}
