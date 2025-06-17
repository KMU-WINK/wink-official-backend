package com.github.kmu_wink.wink_official_page.domain.program.study.service;

import com.github.kmu_wink.wink_official_page.domain.program.study.dto.response.GetCategoriesResponse;
import com.github.kmu_wink.wink_official_page.domain.program.study.dto.response.GetStudiesResponse;
import com.github.kmu_wink.wink_official_page.domain.program.study.repository.StudyRepository;
import com.github.kmu_wink.wink_official_page.domain.program.study.schema.Study;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudyService {

    private final StudyRepository studyRepository;

    public GetStudiesResponse getStudies(int page, String query) {

        PageRequest pageRequest = PageRequest.of(page, 20, Sort.by("index").descending());
        Page<Study> studies = studyRepository.findAllSearch(query, pageRequest);

        return GetStudiesResponse.builder().studies(studies).build();
    }

    public GetStudiesResponse getStudies(String category, int page, String query) {

        PageRequest pageRequest = PageRequest.of(page, 20, Sort.by("index").descending());
        Page<Study> studies = studyRepository.findAllByCategoryAndSearch(category, query, pageRequest);

        return GetStudiesResponse.builder().studies(studies).build();
    }

    public GetCategoriesResponse getCategories() {

        List<String> categories = studyRepository.findAll().stream().map(Study::getCategory).distinct().toList();

        return GetCategoriesResponse.builder().categories(categories).build();
    }
}
