package com.github.kmu_wink.wink_official.domain.recruit.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.stereotype.Service;

import com.github.kmu_wink.wink_official.domain.auth.exception.AlreadyRegisteredException;
import com.github.kmu_wink.wink_official.domain.recruit.constant.techStack.BackendTechStack;
import com.github.kmu_wink.wink_official.domain.recruit.constant.techStack.DesignTechStack;
import com.github.kmu_wink.wink_official.domain.recruit.constant.techStack.DevOpsTechStack;
import com.github.kmu_wink.wink_official.domain.recruit.constant.techStack.FrontendTechStack;
import com.github.kmu_wink.wink_official.domain.recruit.dto.request.EmailCheckRequest;
import com.github.kmu_wink.wink_official.domain.recruit.dto.request.PhoneNumberCheckRequest;
import com.github.kmu_wink.wink_official.domain.recruit.dto.request.RecruitFormRequest;
import com.github.kmu_wink.wink_official.domain.recruit.dto.request.StudentIdCheckRequest;
import com.github.kmu_wink.wink_official.domain.recruit.dto.response.DuplicationCheckResponse;
import com.github.kmu_wink.wink_official.domain.recruit.dto.response.GetRecruitResponse;
import com.github.kmu_wink.wink_official.domain.recruit.exception.AlreadyRecruitedException;
import com.github.kmu_wink.wink_official.domain.recruit.exception.NotValidInterviewDatesException;
import com.github.kmu_wink.wink_official.domain.recruit.exception.NotValidPeriodException;
import com.github.kmu_wink.wink_official.domain.recruit.exception.RecruitNotFoundException;
import com.github.kmu_wink.wink_official.domain.recruit.repository.RecruitFormRepository;
import com.github.kmu_wink.wink_official.domain.recruit.repository.RecruitRepository;
import com.github.kmu_wink.wink_official.domain.recruit.schema.Recruit;
import com.github.kmu_wink.wink_official.domain.recruit.schema.RecruitForm;
import com.github.kmu_wink.wink_official.domain.recruit.util.GoogleFormUtil;
import com.github.kmu_wink.wink_official.domain.user.repository.PreUserRepository;
import com.github.kmu_wink.wink_official.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecruitService {

    private final UserRepository userRepository;
    private final PreUserRepository preUserRepository;
    private final RecruitRepository recruitRepository;
    private final RecruitFormRepository recruitFormRepository;

    private final GoogleFormUtil googleFormUtil;

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public GetRecruitResponse getLatestRecruit() {

        Recruit recruit = recruitRepository.findLatestRecruit().orElse(null);

        if (recruit != null) {
            recruit.setGoogleFormId(null);
            recruit.setGoogleFormUri(null);
            recruit.setGoogleFormResponseEntry(null);
        }

        return GetRecruitResponse.builder()
            .recruit(recruit)
            .build();
    }

    public void recruitForm(String recruitId, RecruitFormRequest dto) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitNotFoundException::new);

        List<LocalDate> interviewDates = dto.interviewDates().stream()
            .map(s -> LocalDate.parse(s, DATE_FORMATTER))
            .peek(date -> {
                if (date.isEqual(LocalDate.of(1, 1, 1))) return;
                if (date.isBefore(recruit.getInterviewStartDate()) || date.isAfter(recruit.getInterviewEndDate())) throw new NotValidInterviewDatesException();
            })
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

        LocalDateTime now = LocalDateTime.now();
        if (now.isBefore(recruit.getRecruitStartDate().atStartOfDay()) || now.isAfter(recruit.getRecruitEndDate().atTime(23, 59, 59))) {
            throw new NotValidPeriodException();
        }

        if (recruitFormRepository.findByRecruitAndStudentId(recruit, dto.studentId()).isPresent()
            || recruitFormRepository.findByRecruitAndEmail(recruit, dto.email()).isPresent()
            || recruitFormRepository.findByRecruitAndPhoneNumber(recruit, dto.phoneNumber()).isPresent()) {

            throw new AlreadyRecruitedException();
        }

        if (userRepository.findByStudentId(dto.studentId()).isPresent()
            || userRepository.findByEmail(dto.email()).isPresent()
            || userRepository.findByPhoneNumber(dto.phoneNumber()).isPresent()
            || preUserRepository.findByStudentId(dto.studentId()).isPresent()
            || preUserRepository.findByEmail(dto.email()).isPresent()
            || preUserRepository.findByPhoneNumber(dto.phoneNumber()).isPresent()) {

            throw new AlreadyRegisteredException();
        }

        RecruitForm form = RecruitForm.builder()
            .recruit(recruit)
            .name(dto.name())
            .studentId(dto.studentId())
            .department(dto.department())
            .email(dto.email())
            .phoneNumber(dto.phoneNumber())
            .jiwonDonggi(dto.jiwonDonggi())
            .selfIntroduce(dto.selfIntroduce())
            .outings(dto.outings())
            .interviewDates(interviewDates)
            .whyCannotInterview(dto.whyCannotInterview())
            .github(dto.github())
            .frontendTechStacks(frontendTechStacks)
            .backendTechStacks(backendTechStacks)
            .devOpsTechStacks(devOpsTechStacks)
            .designTechStacks(designTechStacks)
            .favoriteProject(dto.favoriteProject())
            .paperPass(null)
            .interviewPass(null)
            .build();

        googleFormUtil.createResponse(form);
        recruitFormRepository.save(form);
    }

    public DuplicationCheckResponse checkStudentId(String recruitId, StudentIdCheckRequest dto) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitNotFoundException::new);

        boolean duplicated = userRepository.findByStudentId(dto.studentId()).isPresent()
            || preUserRepository.findByStudentId(dto.studentId()).isPresent()
            || recruitFormRepository.findByRecruitAndStudentId(recruit, dto.studentId()).isPresent();

        return DuplicationCheckResponse.builder()
            .duplicated(duplicated)
            .build();
    }

    public DuplicationCheckResponse checkEmail(String recruitId, EmailCheckRequest dto) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitNotFoundException::new);

        boolean duplicated = userRepository.findByEmail(dto.email()).isPresent()
            || preUserRepository.findByEmail(dto.email()).isPresent()
            || recruitFormRepository.findByRecruitAndEmail(recruit, dto.email()).isPresent();

        return DuplicationCheckResponse.builder()
            .duplicated(duplicated)
            .build();
    }

    public DuplicationCheckResponse checkPhoneNumber(String recruitId, PhoneNumberCheckRequest dto) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitNotFoundException::new);

        boolean duplicated = userRepository.findByPhoneNumber(dto.phoneNumber()).isPresent()
            || preUserRepository.findByPhoneNumber(dto.phoneNumber()).isPresent()
            || recruitFormRepository.findByRecruitAndPhoneNumber(recruit, dto.phoneNumber()).isPresent();

        return DuplicationCheckResponse.builder()
            .duplicated(duplicated)
            .build();
    }
}
