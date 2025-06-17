package com.github.kmu_wink.wink_official_page.domain.recruit.service;

import com.github.kmu_wink.wink_official_page.domain.auth.exception.AlreadyRegisteredException;
import com.github.kmu_wink.wink_official_page.domain.recruit.dto.request.EmailCheckRequest;
import com.github.kmu_wink.wink_official_page.domain.recruit.dto.request.PhoneNumberCheckRequest;
import com.github.kmu_wink.wink_official_page.domain.recruit.dto.request.RecruitFormRequest;
import com.github.kmu_wink.wink_official_page.domain.recruit.dto.request.StudentIdCheckRequest;
import com.github.kmu_wink.wink_official_page.domain.recruit.dto.response.DuplicationCheckResponse;
import com.github.kmu_wink.wink_official_page.domain.recruit.dto.response.GetRecruitResponse;
import com.github.kmu_wink.wink_official_page.domain.recruit.exception.AlreadyRecruitedException;
import com.github.kmu_wink.wink_official_page.domain.recruit.exception.NotValidInterviewDatesException;
import com.github.kmu_wink.wink_official_page.domain.recruit.exception.NotValidRecruitPeriodException;
import com.github.kmu_wink.wink_official_page.domain.recruit.exception.RecruitNotFoundException;
import com.github.kmu_wink.wink_official_page.domain.recruit.repository.RecruitFormRepository;
import com.github.kmu_wink.wink_official_page.domain.recruit.repository.RecruitRepository;
import com.github.kmu_wink.wink_official_page.domain.recruit.schema.Recruit;
import com.github.kmu_wink.wink_official_page.domain.recruit.schema.RecruitForm;
import com.github.kmu_wink.wink_official_page.domain.user.repository.PreUserRepository;
import com.github.kmu_wink.wink_official_page.domain.user.repository.UserRepository;
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

    public GetRecruitResponse getLatestRecruit() {

        Recruit recruit = recruitRepository.findLatestRecruit().orElse(null);

        return GetRecruitResponse.builder().recruit(recruit).build();
    }

    public void recruitForm(String recruitId, RecruitFormRequest dto) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitNotFoundException::new);

        dto.interviewDates().stream().peek(date -> {
            if (date.isEqual(LocalDate.of(1, 1, 1))) {
                return;
            }
            if (date.isBefore(recruit.getInterviewStartDate()) || date.isAfter(recruit.getInterviewEndDate())) {
                throw new NotValidInterviewDatesException();
            }
        });

        LocalDateTime now = LocalDateTime.now();
        if (now.isBefore(recruit.getRecruitStartDate().atStartOfDay()) ||
                now.isAfter(recruit.getRecruitEndDate().atTime(23, 59, 59))) {

            throw new NotValidRecruitPeriodException();
        }

        if (recruitFormRepository.findByRecruitAndStudentId(recruit, dto.studentId()).isPresent() ||
                recruitFormRepository.findByRecruitAndEmail(recruit, dto.email()).isPresent() ||
                recruitFormRepository.findByRecruitAndPhoneNumber(recruit, dto.phoneNumber()).isPresent()) {

            throw new AlreadyRecruitedException();
        }

        if (userRepository.findByStudentId(dto.studentId()).isPresent() ||
                userRepository.findByEmail(dto.email()).isPresent() ||
                userRepository.findByPhoneNumber(dto.phoneNumber()).isPresent() ||
                preUserRepository.findByStudentId(dto.studentId()).isPresent() ||
                preUserRepository.findByEmail(dto.email()).isPresent() ||
                preUserRepository.findByPhoneNumber(dto.phoneNumber()).isPresent()) {

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

        recruitFormRepository.save(form);
    }

    public DuplicationCheckResponse checkStudentId(String recruitId, StudentIdCheckRequest dto) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitNotFoundException::new);

        boolean duplicated = userRepository.findByStudentId(dto.studentId()).isPresent() ||
                preUserRepository.findByStudentId(dto.studentId()).isPresent() ||
                recruitFormRepository.findByRecruitAndStudentId(recruit, dto.studentId()).isPresent();

        return DuplicationCheckResponse.builder().duplicated(duplicated).build();
    }

    public DuplicationCheckResponse checkEmail(String recruitId, EmailCheckRequest dto) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitNotFoundException::new);

        boolean duplicated = userRepository.findByEmail(dto.email()).isPresent() ||
                preUserRepository.findByEmail(dto.email()).isPresent() ||
                recruitFormRepository.findByRecruitAndEmail(recruit, dto.email()).isPresent();

        return DuplicationCheckResponse.builder().duplicated(duplicated).build();
    }

    public DuplicationCheckResponse checkPhoneNumber(String recruitId, PhoneNumberCheckRequest dto) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitNotFoundException::new);

        boolean duplicated = userRepository.findByPhoneNumber(dto.phoneNumber()).isPresent() ||
                preUserRepository.findByPhoneNumber(dto.phoneNumber()).isPresent() ||
                recruitFormRepository.findByRecruitAndPhoneNumber(recruit, dto.phoneNumber()).isPresent();

        return DuplicationCheckResponse.builder().duplicated(duplicated).build();
    }
}
