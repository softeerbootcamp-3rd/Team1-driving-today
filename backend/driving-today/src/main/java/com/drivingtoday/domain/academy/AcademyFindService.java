package com.drivingtoday.domain.academy;

import com.drivingtoday.domain.academy.dto.AcademySearchResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AcademyFindService {

    private final AcademyRepository academyRepository;

    public List<AcademySearchResponse> findAcademies(String name) {
        List<Academy> academies = academyRepository.findAllByName(name);
        return academies.stream().map(AcademySearchResponse::from).toList();
    }
}
