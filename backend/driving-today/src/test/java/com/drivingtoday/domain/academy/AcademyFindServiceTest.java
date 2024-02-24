package com.drivingtoday.domain.academy;

import com.drivingtoday.domain.academy.dto.AcademySearchResponse;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AcademyFindServiceTest {

    @InjectMocks
    private AcademyFindService academyFindService;

    @Mock
    private AcademyRepository academyRepository;

    @Test
    public void 학원_찾기_테스트() {
        Academy academy = Academy.builder()
                        .name("학동운전전문학원")
                                .build();
        List<Academy> academies = new ArrayList<>();
        academies.add(academy);
        when(academyRepository.findAllByName(any(String.class))).thenReturn(academies);

        List<AcademySearchResponse> result = academyFindService.findAcademies("학동운전전문학원");
        Assertions.assertThat(result.get(0).getName()).isEqualTo("학동운전전문학원");
    }
}