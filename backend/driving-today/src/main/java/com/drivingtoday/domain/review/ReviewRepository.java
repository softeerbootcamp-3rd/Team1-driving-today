package com.drivingtoday.domain.review;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query("SELECT r " +
            "FROM Review r JOIN FETCH r.student s " +
            "WHERE r.instructor.id = :instructorId")
    Slice<Review> findAllByInstructorId(Long instructorId, Pageable pageable);

    // 특정 강사의 리뷰 평균 평점을 가져오는 쿼리
    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.instructor.id = :instructorId")
    Double findAverageRatingByInstructorId(Long instructorId);
}