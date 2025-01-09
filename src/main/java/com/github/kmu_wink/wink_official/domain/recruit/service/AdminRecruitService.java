
package com.github.kmu_wink.wink_official.domain.recruit.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.github.kmu_wink.wink_official.common.email.EmailSender;
import com.github.kmu_wink.wink_official.common.sms.SmsSender;
import com.github.kmu_wink.wink_official.domain.recruit.constant.FormEntryKeys;
import com.github.kmu_wink.wink_official.domain.recruit.dto.request.CreateRecruitRequest;
import com.github.kmu_wink.wink_official.domain.recruit.dto.request.FinalizePaperRequest;
import com.github.kmu_wink.wink_official.domain.recruit.dto.response.GetApplicationsResponse;
import com.github.kmu_wink.wink_official.domain.recruit.dto.response.GetRecruitResponse;
import com.github.kmu_wink.wink_official.domain.recruit.dto.response.GetRecruitsResponse;
import com.github.kmu_wink.wink_official.domain.recruit.exception.AlreadyInterviewEndedException;
import com.github.kmu_wink.wink_official.domain.recruit.exception.AlreadyPaperEndedException;
import com.github.kmu_wink.wink_official.domain.recruit.exception.ApplicationNotFoundException;
import com.github.kmu_wink.wink_official.domain.recruit.exception.ItsPaperFailedException;
import com.github.kmu_wink.wink_official.domain.recruit.exception.RecruitNotFoundException;
import com.github.kmu_wink.wink_official.domain.recruit.exception.RemainSmsLackException;
import com.github.kmu_wink.wink_official.domain.recruit.repository.ApplicationRepository;
import com.github.kmu_wink.wink_official.domain.recruit.repository.RecruitRepository;
import com.github.kmu_wink.wink_official.domain.recruit.schema.Application;
import com.github.kmu_wink.wink_official.domain.recruit.schema.Recruit;
import com.github.kmu_wink.wink_official.domain.recruit.sms.InterviewFailTemplate;
import com.github.kmu_wink.wink_official.domain.recruit.sms.InterviewPassTemplate;
import com.github.kmu_wink.wink_official.domain.recruit.sms.PaperFailTemplate;
import com.github.kmu_wink.wink_official.domain.recruit.sms.PaperPassTemplate;
import com.github.kmu_wink.wink_official.domain.recruit.util.GoogleFormUtil;
import com.github.kmu_wink.wink_official.domain.user.email.InviteTemplate;
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

    private final SmsSender smsSender;

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    private final EmailSender emailSender;

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
            .step(Recruit.Step.PRE)
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

    public void finalizePaper(String recruitId, FinalizePaperRequest dto) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitNotFoundException::new);

        if (recruit.getStep() != Recruit.Step.PRE) throw new AlreadyPaperEndedException();

        List<Application> applications = applicationRepository.findAllByRecruit(recruit);

        if (smsSender.remain() < applications.size()) throw new RemainSmsLackException();

        smsSender.send(
            applications.stream()
                .filter(Application::getPaperPass)
                .map(Application::getPhoneNumber)
                .toList(),
            PaperPassTemplate.of(recruit, dto.interviewUrl()));

        smsSender.send(
            applications.stream()
                .filter(application -> !application.getPaperPass())
                .map(Application::getPhoneNumber)
                .toList(),
            PaperFailTemplate.of(recruit));

        recruit.setStep(Recruit.Step.PAPER_END);

        recruitRepository.save(recruit);
    }

    public void finalizeInterview(String recruitId) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitNotFoundException::new);

        if (recruit.getStep() != Recruit.Step.PAPER_END) throw new AlreadyInterviewEndedException();

        List<Application> applications = applicationRepository.findAllByRecruit(recruit);

        if (smsSender.remain() < applications.size()) throw new RemainSmsLackException();

        smsSender.send(
            applications.stream()
                .filter(Application::getInterviewPass)
                .peek(application -> {
                    PreUser preUser = PreUser.builder()
                        .email(application.getEmail())
                        .name(application.getName())
                        .studentId(application.getStudentId())
                        .phoneNumber(application.getPhoneNumber())
                        .token(UUID.randomUUID().toString())
                        .build();

                    preUserRepository.save(preUser);

                    emailSender.send(application.getEmail(), InviteTemplate.of(preUser));
                })
                .map(Application::getPhoneNumber)
                .toList(),
            InterviewPassTemplate.of(recruit));


        smsSender.send(
            applications.stream()
                .filter(application -> !application.getInterviewPass())
                .map(Application::getPhoneNumber)
                .toList(),
            InterviewFailTemplate.of(recruit));

        recruit.setStep(Recruit.Step.INTERVIEW_END);

        recruitRepository.save(recruit);
    }

    public GetApplicationsResponse getApplications(String recruitId) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitNotFoundException::new);

        List<Application> applications = applicationRepository.findAllByRecruitOrderByCreatedAtDesc(recruit).stream()
            .peek(application -> application.setRecruit(null))
            .toList();

        return GetApplicationsResponse.builder()
            .applications(applications)
            .build();
    }

    public void paperPass(String recruitId, String applicationId) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitNotFoundException::new);

        if (recruit.getStep() != Recruit.Step.PRE) throw new AlreadyPaperEndedException();

        Application application = applicationRepository.findByIdAndRecruit(applicationId, recruit).orElseThrow(ApplicationNotFoundException::new);

        application.setPaperPass(true);

        applicationRepository.save(application);
    }

    public void paperFail(String recruitId, String applicationId) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitNotFoundException::new);

        if (recruit.getStep() != Recruit.Step.PRE) throw new AlreadyPaperEndedException();

        Application application = applicationRepository.findByIdAndRecruit(applicationId, recruit).orElseThrow(ApplicationNotFoundException::new);

        application.setPaperPass(false);

        applicationRepository.save(application);
    }

    public void interviewPass(String recruitId, String applicationId) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitNotFoundException::new);

        if (recruit.getStep() != Recruit.Step.PAPER_END) throw new AlreadyInterviewEndedException();

        Application application = applicationRepository.findByIdAndRecruit(applicationId, recruit).orElseThrow(ApplicationNotFoundException::new);

        if (!application.getPaperPass()) throw new ItsPaperFailedException();

        application.setInterviewPass(true);

        applicationRepository.save(application);
    }

    public void interviewFail(String recruitId, String applicationId) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitNotFoundException::new);

        if (recruit.getStep() != Recruit.Step.PAPER_END) throw new AlreadyInterviewEndedException();

        Application application = applicationRepository.findByIdAndRecruit(applicationId, recruit).orElseThrow(ApplicationNotFoundException::new);

        if (!application.getPaperPass()) throw new ItsPaperFailedException();

        application.setInterviewPass(false);

        applicationRepository.save(application);
    }
}
