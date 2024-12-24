
package com.github.kmu_wink.wink_official.domain.recruit.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.github.kmu_wink.wink_official.domain.recruit.constant.FormEntryKeys;
import com.github.kmu_wink.wink_official.domain.recruit.dto.request.CreateRecruitRequest;
import com.github.kmu_wink.wink_official.domain.recruit.dto.response.GetApplicationResponse;
import com.github.kmu_wink.wink_official.domain.recruit.dto.response.GetApplicationsResponse;
import com.github.kmu_wink.wink_official.domain.recruit.dto.response.GetRecruitResponse;
import com.github.kmu_wink.wink_official.domain.recruit.dto.response.GetRecruitsResponse;
import com.github.kmu_wink.wink_official.domain.recruit.exception.ApplicationNotFoundException;
import com.github.kmu_wink.wink_official.domain.recruit.exception.RecruitNotFoundException;
import com.github.kmu_wink.wink_official.domain.recruit.repository.ApplicationRepository;
import com.github.kmu_wink.wink_official.domain.recruit.repository.RecruitRepository;
import com.github.kmu_wink.wink_official.domain.recruit.schema.Application;
import com.github.kmu_wink.wink_official.domain.recruit.schema.Recruit;
import com.github.kmu_wink.wink_official.domain.recruit.util.GoogleFormUtil;
import com.google.api.services.forms.v1.model.Form;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminRecruitService {

    private final RecruitRepository recruitRepository;
    private final ApplicationRepository applicationRepository;

    private final GoogleFormUtil googleFormUtil;

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public GetRecruitsResponse getRecruits() {

        List<Recruit> recruits = recruitRepository.findAllWithSort();

        return GetRecruitsResponse.builder()
            .recruits(recruits)
            .build();
    }

    public GetRecruitResponse getRecruit(String recruitId) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitNotFoundException::new);

        return GetRecruitResponse.builder()
            .recruit(recruit)
            .build();
    }

    public GetRecruitResponse createRecruit(CreateRecruitRequest dto) {

        Recruit recruit = Recruit.builder()
            .year(dto.year())
            .semester(dto.semester())
            .recruitStartDate(LocalDate.parse(dto.recruitStartDate(), DATE_FORMATTER))
            .recruitEndDate(LocalDate.parse(dto.recruitEndDate(), DATE_FORMATTER))
            .interviewStartDate(LocalDate.parse(dto.interviewStartDate(), DATE_FORMATTER))
            .interviewEndDate(LocalDate.parse(dto.interviewEndDate(), DATE_FORMATTER))
            .build();

        Form form = googleFormUtil.createForm(recruit);
        recruit.setGoogleFormId(form.getFormId());
        recruit.setGoogleFormUri(form.getResponderUri());

        Map<FormEntryKeys, String> googleFormResponseEntry = googleFormUtil.fetchGoogleFormResponseEntry(form);
        recruit.setGoogleFormResponseEntry(googleFormResponseEntry);

        recruit = recruitRepository.save(recruit);

        return GetRecruitResponse.builder()
            .recruit(recruit)
            .build();
    }

    public GetRecruitResponse updateRecruit(String recruitId, CreateRecruitRequest dto) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitNotFoundException::new);

        recruit.setYear(dto.year());
        recruit.setSemester(dto.semester());
        recruit.setRecruitStartDate(LocalDate.parse(dto.recruitStartDate(), DATE_FORMATTER));
        recruit.setRecruitEndDate(LocalDate.parse(dto.recruitEndDate(), DATE_FORMATTER));

        recruit = recruitRepository.save(recruit);

        return GetRecruitResponse.builder()
            .recruit(recruit)
            .build();
    }

    public void deleteRecruit(String recruitId) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitNotFoundException::new);

        applicationRepository.deleteAll(applicationRepository.findAllByRecruit(recruit));
        recruitRepository.delete(recruit);
    }

    public GetApplicationsResponse getApplications(String recruitId) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitNotFoundException::new);

        List<Application> applications = applicationRepository.findAllByRecruitOrderByCreatedAtDesc(recruit).stream()
            .peek(application -> {
                application.setRecruit(null);
                application.setJiwonDonggi(null);
                application.setBaeugoSipeunJeom(null);
                application.setGithub(null);
                application.setFrontendTechStacks(null);
                application.setBackendTechStacks(null);
                application.setDevOpsTechStacks(null);
                application.setDevOpsTechStacks(null);
                application.setFavoriteProject(null);
                application.setLastComment(null);
            })
            .toList();

        return GetApplicationsResponse.builder()
            .applications(applications)
            .build();
    }

    public GetApplicationResponse getApplication(String recruitId, String applicationId) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitNotFoundException::new);
        Application application = applicationRepository.findByIdAndRecruit(applicationId, recruit).orElseThrow(ApplicationNotFoundException::new);

        application.setRecruit(null);

        return GetApplicationResponse.builder()
            .application(application)
            .build();
    }
}
