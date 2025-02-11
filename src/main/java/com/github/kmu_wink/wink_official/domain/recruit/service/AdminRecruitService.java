
package com.github.kmu_wink.wink_official.domain.recruit.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.github.kmu_wink.wink_official.common.email.EmailSender;
import com.github.kmu_wink.wink_official.common.sms.SmsSender;
import com.github.kmu_wink.wink_official.domain.application.util.RandomString;
import com.github.kmu_wink.wink_official.domain.recruit.constant.FormEntryKeys;
import com.github.kmu_wink.wink_official.domain.recruit.dto.request.CreateRecruitRequest;
import com.github.kmu_wink.wink_official.domain.recruit.dto.request.FinalizePaperRequest;
import com.github.kmu_wink.wink_official.domain.recruit.dto.response.GetFormsResponse;
import com.github.kmu_wink.wink_official.domain.recruit.dto.response.GetRecruitResponse;
import com.github.kmu_wink.wink_official.domain.recruit.dto.response.GetRecruitsResponse;
import com.github.kmu_wink.wink_official.domain.recruit.exception.AlreadyInterviewEndedException;
import com.github.kmu_wink.wink_official.domain.recruit.exception.AlreadyPaperEndedException;
import com.github.kmu_wink.wink_official.domain.recruit.exception.AlreadySameRecruitExistsException;
import com.github.kmu_wink.wink_official.domain.recruit.exception.ItsPaperFailedException;
import com.github.kmu_wink.wink_official.domain.recruit.exception.NowIsRecruitingException;
import com.github.kmu_wink.wink_official.domain.recruit.exception.RecruitFormNotFoundException;
import com.github.kmu_wink.wink_official.domain.recruit.exception.RecruitNotFoundException;
import com.github.kmu_wink.wink_official.domain.recruit.exception.RemainSmsLackException;
import com.github.kmu_wink.wink_official.domain.recruit.repository.RecruitFormRepository;
import com.github.kmu_wink.wink_official.domain.recruit.repository.RecruitRepository;
import com.github.kmu_wink.wink_official.domain.recruit.schema.Recruit;
import com.github.kmu_wink.wink_official.domain.recruit.schema.RecruitForm;
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
    private final RecruitFormRepository recruitFormRepository;
    private final PreUserRepository preUserRepository;

    private final GoogleFormUtil googleFormUtil;

    private final SmsSender smsSender;

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    private final EmailSender emailSender;
    private final RandomString randomString;

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

        if (recruitRepository.existsRecruitByYearAndSemester(dto.year(), dto.semester())) throw new AlreadySameRecruitExistsException();

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

    public void deleteRecruit(String recruitId) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitNotFoundException::new);

        recruitFormRepository.deleteAll(recruitFormRepository.findAllByRecruit(recruit));
        recruitRepository.delete(recruit);
    }

    public void finalizePaper(String recruitId, FinalizePaperRequest dto) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitNotFoundException::new);

        LocalDateTime now = LocalDateTime.now();
        if (!now.isAfter(recruit.getRecruitEndDate().atTime(23, 59, 59))) {
            throw new NowIsRecruitingException();
        }

        if (recruit.getStep() != Recruit.Step.PRE) throw new AlreadyPaperEndedException();

        List<RecruitForm> recruitForms = recruitFormRepository.findAllByRecruit(recruit);

        if (smsSender.remain() < recruitForms.size()) throw new RemainSmsLackException();

        smsSender.send(
            recruitForms.stream()
                .filter(RecruitForm::getPaperPass)
                .map(RecruitForm::getPhoneNumber)
                .toList(),
            PaperPassTemplate.of(recruit, dto.interviewUrl()));

        smsSender.send(
            recruitForms.stream()
                .filter(form -> !form.getPaperPass())
                .map(RecruitForm::getPhoneNumber)
                .toList(),
            PaperFailTemplate.of(recruit));

        recruit.setStep(Recruit.Step.PAPER_END);

        recruitRepository.save(recruit);
    }

    public void finalizeInterview(String recruitId) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitNotFoundException::new);

        if (recruit.getStep() != Recruit.Step.PAPER_END) throw new AlreadyInterviewEndedException();

        List<RecruitForm> forms = recruitFormRepository.findAllByRecruit(recruit);

        if (smsSender.remain() < forms.size()) throw new RemainSmsLackException();

        smsSender.send(
            forms.stream()
                .filter(RecruitForm::getInterviewPass)
                .peek(form -> {
                    PreUser preUser = PreUser.builder()
                        .email(form.getEmail())
                        .name(form.getName())
                        .studentId(form.getStudentId())
                        .department(form.getDepartment())
                        .phoneNumber(form.getPhoneNumber())
                        .token(randomString.generate(64))
                        .build();

                    preUserRepository.save(preUser);

                    emailSender.send(form.getEmail(), InviteTemplate.of(preUser));
                })
                .map(RecruitForm::getPhoneNumber)
                .toList(),
            InterviewPassTemplate.of(recruit));

        smsSender.send(
            forms.stream()
                .filter(form -> !form.getInterviewPass())
                .map(RecruitForm::getPhoneNumber)
                .toList(),
            InterviewFailTemplate.of(recruit));

        recruit.setStep(Recruit.Step.INTERVIEW_END);

        recruitRepository.save(recruit);
    }

    public GetFormsResponse getForms(String recruitId) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitNotFoundException::new);

        List<RecruitForm> forms = recruitFormRepository.findAllByRecruitOrderByCreatedAtDesc(recruit).stream()
            .peek(form -> form.setRecruit(null))
            .toList();

        return GetFormsResponse.builder()
            .forms(forms)
            .build();
    }

    public void paperPass(String recruitId, String formId) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitNotFoundException::new);

        if (recruit.getStep() != Recruit.Step.PRE) throw new AlreadyPaperEndedException();

        RecruitForm recruitForm = recruitFormRepository.findByIdAndRecruit(formId, recruit).orElseThrow(
            RecruitFormNotFoundException::new);

        recruitForm.setPaperPass(true);

        recruitFormRepository.save(recruitForm);
    }

    public void paperFail(String recruitId, String formId) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitNotFoundException::new);

        if (recruit.getStep() != Recruit.Step.PRE) throw new AlreadyPaperEndedException();

        RecruitForm recruitForm = recruitFormRepository.findByIdAndRecruit(formId, recruit).orElseThrow(
            RecruitFormNotFoundException::new);

        recruitForm.setPaperPass(false);

        recruitFormRepository.save(recruitForm);
    }

    public void interviewPass(String recruitId, String formId) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitNotFoundException::new);

        if (recruit.getStep() != Recruit.Step.PAPER_END) throw new AlreadyInterviewEndedException();

        RecruitForm recruitForm = recruitFormRepository.findByIdAndRecruit(formId, recruit).orElseThrow(
            RecruitFormNotFoundException::new);

        if (!recruitForm.getPaperPass()) throw new ItsPaperFailedException();

        recruitForm.setInterviewPass(true);

        recruitFormRepository.save(recruitForm);
    }

    public void interviewFail(String recruitId, String formId) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitNotFoundException::new);

        if (recruit.getStep() != Recruit.Step.PAPER_END) throw new AlreadyInterviewEndedException();

        RecruitForm recruitForm = recruitFormRepository.findByIdAndRecruit(formId, recruit).orElseThrow(
            RecruitFormNotFoundException::new);

        if (!recruitForm.getPaperPass()) throw new ItsPaperFailedException();

        recruitForm.setInterviewPass(false);

        recruitFormRepository.save(recruitForm);
    }
}
