package com.github.kmu_wink.wink_official_page.domain.recruit.service;

import com.github.kmu_wink.wink_official_page.domain.recruit.__admin__.__form__.exception.AdminRecruitFormExceptionCode;
import com.github.kmu_wink.wink_official_page.domain.recruit.dto.request.EmailCheckRequest;
import com.github.kmu_wink.wink_official_page.domain.recruit.dto.request.PhoneNumberCheckRequest;
import com.github.kmu_wink.wink_official_page.domain.recruit.dto.request.RecruitFormRequest;
import com.github.kmu_wink.wink_official_page.domain.recruit.dto.request.StudentIdCheckRequest;
import com.github.kmu_wink.wink_official_page.domain.recruit.dto.response.DuplicationCheckResponse;
import com.github.kmu_wink.wink_official_page.domain.recruit.dto.response.GetFormResponse;
import com.github.kmu_wink.wink_official_page.domain.recruit.dto.response.GetRecruitResponse;
import com.github.kmu_wink.wink_official_page.domain.recruit.email.RecruitFormTemplate;
import com.github.kmu_wink.wink_official_page.domain.recruit.exception.RecruitExceptionCode;
import com.github.kmu_wink.wink_official_page.domain.recruit.repository.RecruitFormRepository;
import com.github.kmu_wink.wink_official_page.domain.recruit.repository.RecruitRepository;
import com.github.kmu_wink.wink_official_page.domain.recruit.schema.Recruit;
import com.github.kmu_wink.wink_official_page.domain.recruit.schema.RecruitForm;
import com.github.kmu_wink.wink_official_page.domain.user.repository.PreUserRepository;
import com.github.kmu_wink.wink_official_page.domain.user.repository.UserRepository;
import com.github.kmu_wink.wink_official_page.global.module.email.EmailSender;
import com.github.kmu_wink.wink_official_page.global.util.RandomString;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class RecruitService {

    private final UserRepository userRepository;
    private final PreUserRepository preUserRepository;
    private final RecruitRepository recruitRepository;
    private final RecruitFormRepository recruitFormRepository;
    private final EmailSender emailSender;

    public GetRecruitResponse getLatestRecruit() {

        Recruit recruit = recruitRepository.findLatestRecruit().orElse(null);

        return GetRecruitResponse.builder().recruit(recruit).build();
    }

    public void saveForm(String recruitId, RecruitFormRequest dto) {

        Recruit recruit = recruitRepository.findById(recruitId)
                .orElseThrow(RecruitExceptionCode.NOT_FOUND::toException);

        dto.interviewDates().forEach(date -> {
            if (date.isEqual(LocalDate.of(1, 1, 1))) {
                return;
            }
            if (date.isBefore(recruit.getInterviewStartDate()) || date.isAfter(recruit.getInterviewEndDate())) {
                throw RecruitExceptionCode.NOT_VALID_INTERVIEW_DATES.toException();
            }
        });

        LocalDateTime now = LocalDateTime.now();
        if (now.isBefore(recruit.getRecruitStartDate().atStartOfDay()) ||
                now.isAfter(recruit.getRecruitEndDate().atTime(23, 59, 59))) {

            throw RecruitExceptionCode.NOT_RECRUIT_PERIOD.toException();
        }

        if (recruitFormRepository.findByRecruitAndStudentId(recruit, dto.studentId()).isPresent() ||
                recruitFormRepository.findByRecruitAndEmail(recruit, dto.email()).isPresent() ||
                recruitFormRepository.findByRecruitAndPhoneNumber(recruit, dto.phoneNumber()).isPresent()) {

            throw RecruitExceptionCode.ALREADY_RECRUIT_SUBMITTED.toException();
        }

        if (userRepository.findByStudentId(dto.studentId()).isPresent() ||
                userRepository.findByEmail(dto.email()).isPresent() ||
                userRepository.findByPhoneNumber(dto.phoneNumber()).isPresent() ||
                preUserRepository.findByStudentId(dto.studentId()).isPresent() ||
                preUserRepository.findByEmail(dto.email()).isPresent() ||
                preUserRepository.findByPhoneNumber(dto.phoneNumber()).isPresent()) {

            throw RecruitExceptionCode.ALREADY_MEMBER.toException();
        }

        RecruitForm form = RecruitForm.builder()
                .recruit(recruit)
                .editToken(RandomString.generate(256))
                .name(dto.name())
                .studentId(dto.studentId())
                .department(dto.department())
                .email(dto.email())
                .phoneNumber(dto.phoneNumber())
                .jiwonDonggi(dto.jiwonDonggi())
                .selfIntroduce(dto.selfIntroduce())
                .outings(dto.outings())
                .interviewDates(dto.interviewDates())
                .whyCannotInterview(dto.whyCannotInterview())
                .github(dto.github())
                .frontendTechStacks(dto.frontendTechStacks())
                .backendTechStacks(dto.backendTechStacks())
                .devOpsTechStacks(dto.devOpsTechStacks())
                .designTechStacks(dto.designTechStacks())
                .favoriteProject(dto.favoriteProject())
                .paperPass(null)
                .interviewPass(null)
                .build();

        form = recruitFormRepository.save(form);

        emailSender.send(dto.email(), RecruitFormTemplate.of(form));
    }

    public GetFormResponse getEditForm(String editToken) {

        RecruitForm form = recruitFormRepository.findByEditToken(editToken)
                .orElseThrow(AdminRecruitFormExceptionCode.NOT_FOUND::toException);

        Recruit recruit = form.getRecruit();

        LocalDateTime now = LocalDateTime.now();
        if (now.isBefore(recruit.getRecruitStartDate().atStartOfDay()) ||
                now.isAfter(recruit.getRecruitEndDate().atTime(23, 59, 59))) {

            throw RecruitExceptionCode.NOT_RECRUIT_PERIOD.toException();
        }

        return GetFormResponse.builder().form(form).build();
    }

    public void editForm(String editToken, RecruitFormRequest dto) {

        RecruitForm form = recruitFormRepository.findByEditToken(editToken)
                .orElseThrow(AdminRecruitFormExceptionCode.NOT_FOUND::toException);

        Recruit recruit = form.getRecruit();

        dto.interviewDates().forEach(date -> {
            if (date.isEqual(LocalDate.of(1, 1, 1))) {
                return;
            }
            if (date.isBefore(recruit.getInterviewStartDate()) || date.isAfter(recruit.getInterviewEndDate())) {
                throw RecruitExceptionCode.NOT_VALID_INTERVIEW_DATES.toException();
            }
        });

        LocalDateTime now = LocalDateTime.now();
        if (now.isBefore(recruit.getRecruitStartDate().atStartOfDay()) ||
                now.isAfter(recruit.getRecruitEndDate().atTime(23, 59, 59))) {

            throw RecruitExceptionCode.NOT_RECRUIT_PERIOD.toException();
        }

        if (userRepository.findByStudentId(dto.studentId()).isPresent() ||
                userRepository.findByEmail(dto.email()).isPresent() ||
                userRepository.findByPhoneNumber(dto.phoneNumber()).isPresent() ||
                preUserRepository.findByStudentId(dto.studentId()).isPresent() ||
                preUserRepository.findByEmail(dto.email()).isPresent() ||
                preUserRepository.findByPhoneNumber(dto.phoneNumber()).isPresent()) {

            throw RecruitExceptionCode.ALREADY_MEMBER.toException();
        }

        form.setName(dto.name());
        form.setStudentId(dto.studentId());
        form.setDepartment(dto.department());
        form.setEmail(dto.email());
        form.setPhoneNumber(dto.phoneNumber());
        form.setJiwonDonggi(dto.jiwonDonggi());
        form.setSelfIntroduce(dto.selfIntroduce());
        form.setOutings(dto.outings());
        form.setInterviewDates(dto.interviewDates());
        form.setWhyCannotInterview(dto.whyCannotInterview());
        form.setGithub(dto.github());
        form.setFrontendTechStacks(dto.frontendTechStacks());
        form.setBackendTechStacks(dto.backendTechStacks());
        form.setDevOpsTechStacks(dto.devOpsTechStacks());
        form.setDesignTechStacks(dto.designTechStacks());
        form.setFavoriteProject(dto.favoriteProject());

        recruitFormRepository.save(form);
    }

    public DuplicationCheckResponse checkStudentId(String recruitId, StudentIdCheckRequest dto) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitExceptionCode.NOT_FOUND::toException);

        boolean duplicated = userRepository.findByStudentId(dto.studentId()).isPresent() ||
                preUserRepository.findByStudentId(dto.studentId()).isPresent() ||
                recruitFormRepository.findByRecruitAndStudentId(recruit, dto.studentId()).isPresent();

        return DuplicationCheckResponse.builder().duplicated(duplicated).build();
    }

    public DuplicationCheckResponse checkEmail(String recruitId, EmailCheckRequest dto) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitExceptionCode.NOT_FOUND::toException);

        boolean duplicated = userRepository.findByEmail(dto.email()).isPresent() ||
                preUserRepository.findByEmail(dto.email()).isPresent() ||
                recruitFormRepository.findByRecruitAndEmail(recruit, dto.email()).isPresent();

        return DuplicationCheckResponse.builder().duplicated(duplicated).build();
    }

    public DuplicationCheckResponse checkPhoneNumber(String recruitId, PhoneNumberCheckRequest dto) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitExceptionCode.NOT_FOUND::toException);

        boolean duplicated = userRepository.findByPhoneNumber(dto.phoneNumber()).isPresent() ||
                preUserRepository.findByPhoneNumber(dto.phoneNumber()).isPresent() ||
                recruitFormRepository.findByRecruitAndPhoneNumber(recruit, dto.phoneNumber()).isPresent();

        return DuplicationCheckResponse.builder().duplicated(duplicated).build();
    }
}
