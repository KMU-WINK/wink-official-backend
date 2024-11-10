
package com.github.kmu_wink.wink_official.domain.recruit.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.github.kmu_wink.wink_official.common.email.EmailSender;
import com.github.kmu_wink.wink_official.domain.recruit.constant.FormEntryKeys;
import com.github.kmu_wink.wink_official.domain.recruit.dto.request.CreateRecruitRequest;
import com.github.kmu_wink.wink_official.domain.recruit.dto.response.GetApplicationResponse;
import com.github.kmu_wink.wink_official.domain.recruit.dto.response.GetApplicationsResponse;
import com.github.kmu_wink.wink_official.domain.recruit.dto.response.GetRecruitResponse;
import com.github.kmu_wink.wink_official.domain.recruit.dto.response.GetRecruitsResponse;
import com.github.kmu_wink.wink_official.domain.recruit.email.ApplicationFailTemplate;
import com.github.kmu_wink.wink_official.domain.recruit.email.ApplicationPassTemplate;
import com.github.kmu_wink.wink_official.domain.recruit.exception.AlreadyChangedPassStateException;
import com.github.kmu_wink.wink_official.domain.recruit.exception.ApplicationNotFoundException;
import com.github.kmu_wink.wink_official.domain.recruit.exception.RecruitNotFoundException;
import com.github.kmu_wink.wink_official.domain.recruit.repository.ApplicationRepository;
import com.github.kmu_wink.wink_official.domain.recruit.repository.RecruitRepository;
import com.github.kmu_wink.wink_official.domain.recruit.schema.Application;
import com.github.kmu_wink.wink_official.domain.recruit.schema.Recruit;
import com.github.kmu_wink.wink_official.domain.recruit.util.GoogleFormUtil;
import com.github.kmu_wink.wink_official.domain.user.repository.PreUserRepository;
import com.github.kmu_wink.wink_official.domain.user.schema.PreUser;
import com.google.api.services.forms.v1.model.Form;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminRecruitService {

    private final RecruitRepository recruitRepository;
    private final ApplicationRepository applicationRepository;
    private final PreUserRepository preUserRepository;

    private final GoogleFormUtil googleFormUtil;
    private final EmailSender emailSender;

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

    public GetRecruitsResponse getRecruits() {

        List<Recruit> recruits = recruitRepository.findAllWithSort();

        return GetRecruitsResponse.builder()
            .recruits(recruits)
            .build();
    }

    public GetRecruitResponse createRecruit(CreateRecruitRequest dto) {

        Recruit recruit = Recruit.builder()
            .year(dto.year())
            .semester(dto.semester())
            .recruitStartDateTime(LocalDateTime.parse(dto.recruitStartDateTime(), DATE_TIME_FORMATTER))
            .recruitEndDateTime(LocalDateTime.parse(dto.recruitEndDateTime(), DATE_TIME_FORMATTER))
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

    public GetApplicationsResponse getApplications(String recruitId) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitNotFoundException::new);

        List<Application> applications = applicationRepository.findAllByRecruitOrderByCreatedAtDesc(recruit).stream()
            .peek(application -> {
                application.setRecruit(null);
                application.setJiwonDonggi(null);
                application.setBaeugoSipeunJeom(null);
                application.setDomains(null);
                application.setGithub(null);
                application.setFrontendTechStacks(null);
                application.setBackendTechStacks(null);
                application.setDatabaseTechStacks(null);
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

    public void passApplication(String recruitId, String applicationId) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitNotFoundException::new);
        Application application = applicationRepository.findByIdAndRecruit(applicationId, recruit).orElseThrow(ApplicationNotFoundException::new);

        if (application.getPassed() != null) {

            throw new AlreadyChangedPassStateException();
        }

        application.setPassed(true);

        applicationRepository.save(application);

        PreUser preUser = PreUser.builder()
            .name(application.getName())
            .studentId(application.getStudentId())
            .email(application.getEmail())
            .phoneNumber(application.getPhoneNumber())
            .token(UUID.randomUUID().toString())
            .build();

        preUser = preUserRepository.save(preUser);
        emailSender.send(application.getEmail(), ApplicationPassTemplate.of(preUser));
    }

    public void failApplication(String recruitId, String applicationId) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitNotFoundException::new);
        Application application = applicationRepository.findByIdAndRecruit(applicationId, recruit).orElseThrow(ApplicationNotFoundException::new);

        if (application.getPassed() != null) {

            throw new AlreadyChangedPassStateException();
        }

        application.setPassed(false);

        applicationRepository.save(application);

        emailSender.send(application.getEmail(), ApplicationFailTemplate.of(application));
    }
}
