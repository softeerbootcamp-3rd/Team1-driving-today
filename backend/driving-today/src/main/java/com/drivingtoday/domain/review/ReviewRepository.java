package com.drivingtoday.domain.review;

<<<<<<< HEAD
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
=======
>>>>>>> 2b4c3bd ([BE] chore : 불필요한 import문 및 setter 제거)
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    Page<Review> findAllByInstructorId(Long instructorId, Pageable pageable);
}
