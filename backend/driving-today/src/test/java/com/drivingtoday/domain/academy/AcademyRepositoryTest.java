package com.drivingtoday.domain.academy;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@DataJpaTest
class AcademyRepositoryTest {

    @Autowired
    private AcademyRepository academyRepository;

    @Test
    @DisplayName("'동' 이라는 글자가 들어간 학원을 조회한다")
    void 조회_테스트() {
        //given
        Academy academy1 = Academy.builder().name("학동운전전문학원").build();
        Academy academy2 = Academy.builder().name("원동운전전문학원").build();
        Academy academy3 = Academy.builder().name("원주운전전문학원").build();
        Academy academy4 = Academy.builder().name("서울운전전문학원").build();

        academyRepository.save(academy1);
        academyRepository.save(academy2);
        academyRepository.save(academy3);
        academyRepository.save(academy4);

        // when
        List<Academy> academies = academyRepository.findAllByName("동");

        // then
        assertThat(academies.size()).isEqualTo(2);
    }
}