package com.github.kmu_wink.wink_official.domain.recruit.service;

import com.github.kmu_wink.wink_official.domain.recruit.dto.request.ApplicationRequest;
import com.github.kmu_wink.wink_official.domain.recruit.dto.request.EmaiilCheckRequest;
import com.github.kmu_wink.wink_official.domain.recruit.dto.request.PhoneNumberCheckRequest;
import com.github.kmu_wink.wink_official.domain.recruit.dto.request.StudentIdCheckRequest;
import com.github.kmu_wink.wink_official.domain.recruit.dto.response.DuplicationCheckResponse;
import com.github.kmu_wink.wink_official.domain.recruit.dto.response.GetLatestRecruitResponse;
import com.github.kmu_wink.wink_official.domain.recruit.exception.AlreadyApplicationException;
import com.github.kmu_wink.wink_official.domain.recruit.exception.RecruitNotFoundException;
import com.github.kmu_wink.wink_official.domain.recruit.repository.ApplicationRepository;
import com.github.kmu_wink.wink_official.domain.recruit.repository.RecruitRepository;
import com.github.kmu_wink.wink_official.domain.recruit.schema.Application;
import com.github.kmu_wink.wink_official.domain.recruit.schema.Recruit;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RecruitService {

    private final RecruitRepository recruitRepository;
    private final ApplicationRepository applicationRepository;

    public GetLatestRecruitResponse getLatestRecruit() {

        Recruit recruit = recruitRepository.findFirstByOrderByYearDescSemesterDesc().orElse(null);

        return GetLatestRecruitResponse.builder()
                .recruit(recruit)
                .build();
    }

    public void application(ApplicationRequest dto) {

        Recruit recruit = recruitRepository.findById(dto.recruitId()).orElseThrow(RecruitNotFoundException::new);

        List<LocalDate> canInterviewDates = dto.canInterviewDates().stream()
                .map(s -> {
                    int year = Integer.parseInt(s.substring(0, 4));
                    int month = Integer.parseInt(s.substring(5, 7));
                    int day = Integer.parseInt(s.substring(8, 10));

                    return LocalDate.of(year, month, day);
                })
                .toList();

        Application.Domain domain = Application.Domain.valueOf(dto.domain());

        List<Application.FrontendTechStack> frontendTechStacks = dto.frontendTechStacks() != null
                ? dto.frontendTechStacks().stream()
                .map(Application.FrontendTechStack::valueOf)
                .toList()
                : List.of();

        List<Application.BackendTechStack> backendTechStacks = dto.backendTechStacks() != null
                ? dto.backendTechStacks().stream()
                .map(Application.BackendTechStack::valueOf)
                .toList()
                : List.of();

        List<Application.DatabaseTechStack> databaseTechStacks = dto.databaseTechStacks() != null
                ? dto.databaseTechStacks().stream()
                .map(Application.DatabaseTechStack::valueOf)
                .toList()
                : List.of();

        List<Application.DevOpsTechStack> devOpsTechStacks = dto.devOpsTechStacks() != null
                ? dto.devOpsTechStacks().stream()
                .map(Application.DevOpsTechStack::valueOf)
                .toList()
                : List.of();

        List<Application.DesignTools> designTools = dto.designTools() != null
                ? dto.designTools().stream()
                .map(Application.DesignTools::valueOf)
                .toList()
                : List.of();

        if (applicationRepository.findByRecruitAndStudentId(recruit, dto.studentId()).isPresent()
            || applicationRepository.findByRecruitAndEmail(recruit, dto.email()).isPresent()
            || applicationRepository.findByRecruitAndPhoneNumber(recruit, dto.phoneNumber()).isPresent()) {

            throw new AlreadyApplicationException();
        }

        Application application = Application.builder()
                .recruit(recruit)
                .name(dto.name())
                .studentId(dto.studentId())
                .email(dto.email())
                .phoneNumber(dto.phoneNumber())
                .jiwonDonggi(dto.jiwonDonggi())
                .baeugoSipeunJeom(dto.baeugoSipeunJeom())
                .canInterviewDates(canInterviewDates)
                .domain(domain)
                .github(dto.github())
                .frontendTechStacks(frontendTechStacks)
                .backendTechStacks(backendTechStacks)
                .databaseTechStacks(databaseTechStacks)
                .devOpsTechStacks(devOpsTechStacks)
                .designTools(designTools)
                .favoriteProject(dto.favoriteProject())
                .lastComment(dto.lastComment())
                .build();

        applicationRepository.save(application);
    }

    public DuplicationCheckResponse checkStudentId(StudentIdCheckRequest dto) {

        Recruit recruit = recruitRepository.findById(dto.recruitId()).orElseThrow(RecruitNotFoundException::new);

        boolean duplicated = applicationRepository.findByRecruitAndStudentId(recruit, dto.studentId()).isPresent();

        return DuplicationCheckResponse.builder()
                .duplicated(duplicated)
                .build();
    }

    public DuplicationCheckResponse checkEmail(EmaiilCheckRequest dto) {

        Recruit recruit = recruitRepository.findById(dto.recruitId()).orElseThrow(RecruitNotFoundException::new);

        boolean duplicated = applicationRepository.findByRecruitAndEmail(recruit, dto.email()).isPresent();

        return DuplicationCheckResponse.builder()
                .duplicated(duplicated)
                .build();
    }

    public DuplicationCheckResponse checkPhoneNumber(PhoneNumberCheckRequest dto) {

        Recruit recruit = recruitRepository.findById(dto.recruitId()).orElseThrow(RecruitNotFoundException::new);

        boolean duplicated = applicationRepository.findByRecruitAndPhoneNumber(recruit, dto.phoneNumber()).isPresent();

        return DuplicationCheckResponse.builder()
                .duplicated(duplicated)
                .build();
    }
}
