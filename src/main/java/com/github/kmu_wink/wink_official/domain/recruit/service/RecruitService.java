package com.github.kmu_wink.wink_official.domain.recruit.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.stereotype.Service;

import com.github.kmu_wink.wink_official.domain.recruit.constant.Domain;
import com.github.kmu_wink.wink_official.domain.recruit.constant.techStack.BackendTechStack;
import com.github.kmu_wink.wink_official.domain.recruit.constant.techStack.DatabaseTechStack;
import com.github.kmu_wink.wink_official.domain.recruit.constant.techStack.DesignTechStack;
import com.github.kmu_wink.wink_official.domain.recruit.constant.techStack.DevOpsTechStack;
import com.github.kmu_wink.wink_official.domain.recruit.constant.techStack.FrontendTechStack;
import com.github.kmu_wink.wink_official.domain.recruit.dto.request.ApplicationRequest;
import com.github.kmu_wink.wink_official.domain.recruit.dto.request.EmailCheckRequest;
import com.github.kmu_wink.wink_official.domain.recruit.dto.request.PhoneNumberCheckRequest;
import com.github.kmu_wink.wink_official.domain.recruit.dto.request.StudentIdCheckRequest;
import com.github.kmu_wink.wink_official.domain.recruit.dto.response.DuplicationCheckResponse;
import com.github.kmu_wink.wink_official.domain.recruit.dto.response.GetRecruitResponse;
import com.github.kmu_wink.wink_official.domain.recruit.exception.AlreadyApplicationException;
import com.github.kmu_wink.wink_official.domain.recruit.exception.RecruitNotFoundException;
import com.github.kmu_wink.wink_official.domain.recruit.repository.ApplicationRepository;
import com.github.kmu_wink.wink_official.domain.recruit.repository.RecruitRepository;
import com.github.kmu_wink.wink_official.domain.recruit.schema.Application;
import com.github.kmu_wink.wink_official.domain.recruit.schema.Recruit;
import com.github.kmu_wink.wink_official.domain.recruit.util.GoogleFormUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecruitService {

    private final RecruitRepository recruitRepository;
    private final ApplicationRepository applicationRepository;

    private final GoogleFormUtil googleFormUtil;

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public GetRecruitResponse getLatestRecruit() {

        Recruit recruit = recruitRepository.findFirstByOrderByYearDescSemesterDesc().orElse(null);

        if (recruit != null) {
            recruit.setGoogleFormId(null);
            recruit.setGoogleFormUri(null);
            recruit.setGoogleFormResponseEntry(null);
        }

        return GetRecruitResponse.builder()
                .recruit(recruit)
                .build();
    }

    public void application(String recruitId, ApplicationRequest dto) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitNotFoundException::new);

        List<LocalDate> canInterviewDates = dto.canInterviewDates().stream()
                .map(s -> LocalDate.parse(s, DATE_FORMATTER))
                .toList();

        List<Domain> domains = dto.domains().stream()
            .map(Domain::valueOf)
            .toList();

        List<FrontendTechStack> frontendTechStacks = dto.frontendTechStacks() != null
                ? dto.frontendTechStacks().stream()
                .map(FrontendTechStack::valueOf)
                .toList()
                : List.of();

        List<BackendTechStack> backendTechStacks = dto.backendTechStacks() != null
                ? dto.backendTechStacks().stream()
                .map(BackendTechStack::valueOf)
                .toList()
                : List.of();

        List<DatabaseTechStack> databaseTechStacks = dto.databaseTechStacks() != null
                ? dto.databaseTechStacks().stream()
                .map(DatabaseTechStack::valueOf)
                .toList()
                : List.of();

        List<DevOpsTechStack> devOpsTechStacks = dto.devOpsTechStacks() != null
                ? dto.devOpsTechStacks().stream()
                .map(DevOpsTechStack::valueOf)
                .toList()
                : List.of();

        List<DesignTechStack> designTechStacks = dto.designTechStacks() != null
                ? dto.designTechStacks().stream()
                .map(DesignTechStack::valueOf)
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
                .domains(domains)
                .github(dto.github())
                .frontendTechStacks(frontendTechStacks)
                .backendTechStacks(backendTechStacks)
                .databaseTechStacks(databaseTechStacks)
                .devOpsTechStacks(devOpsTechStacks)
                .designTechStacks(designTechStacks)
                .favoriteProject(dto.favoriteProject())
                .lastComment(dto.lastComment())
                .passed(null)
                .build();

        googleFormUtil.createResponse(application);
        applicationRepository.save(application);
    }

    public DuplicationCheckResponse checkStudentId(String recruitId, StudentIdCheckRequest dto) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitNotFoundException::new);

        boolean duplicated = applicationRepository.findByRecruitAndStudentId(recruit, dto.studentId()).isPresent();

        return DuplicationCheckResponse.builder()
                .duplicated(duplicated)
                .build();
    }

    public DuplicationCheckResponse checkEmail(String recruitId, EmailCheckRequest dto) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitNotFoundException::new);

        boolean duplicated = applicationRepository.findByRecruitAndEmail(recruit, dto.email()).isPresent();

        return DuplicationCheckResponse.builder()
                .duplicated(duplicated)
                .build();
    }

    public DuplicationCheckResponse checkPhoneNumber(String recruitId, PhoneNumberCheckRequest dto) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitNotFoundException::new);

        boolean duplicated = applicationRepository.findByRecruitAndPhoneNumber(recruit, dto.phoneNumber()).isPresent();

        return DuplicationCheckResponse.builder()
                .duplicated(duplicated)
                .build();
    }
}
