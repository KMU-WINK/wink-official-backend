package com.github.kmu_wink.wink_official_page.domain.recruit.__admin__.form.service;

import com.github.kmu_wink.wink_official_page.domain.application.util.RandomString;
import com.github.kmu_wink.wink_official_page.domain.recruit.__admin__.form.dto.response.GetFormsResponse;
import com.github.kmu_wink.wink_official_page.domain.recruit.__admin__.form.exception.AlreadyInterviewEndedException;
import com.github.kmu_wink.wink_official_page.domain.recruit.__admin__.form.exception.AlreadyPaperEndedException;
import com.github.kmu_wink.wink_official_page.domain.recruit.__admin__.form.exception.ItsPaperFailedException;
import com.github.kmu_wink.wink_official_page.domain.recruit.__admin__.form.exception.NowIsRecruitingException;
import com.github.kmu_wink.wink_official_page.domain.recruit.__admin__.form.exception.RecruitFormNotFoundException;
import com.github.kmu_wink.wink_official_page.domain.recruit.__admin__.form.exception.SmsMessageIsEmptyException;
import com.github.kmu_wink.wink_official_page.domain.recruit.__admin__.sms.exception.RemainSmsLackException;
import com.github.kmu_wink.wink_official_page.domain.recruit.__admin__.sms.repository.RecruitSmsRepository;
import com.github.kmu_wink.wink_official_page.domain.recruit.__admin__.sms.schema.RecruitSms;
import com.github.kmu_wink.wink_official_page.domain.recruit.exception.RecruitNotFoundException;
import com.github.kmu_wink.wink_official_page.domain.recruit.repository.RecruitFormRepository;
import com.github.kmu_wink.wink_official_page.domain.recruit.repository.RecruitRepository;
import com.github.kmu_wink.wink_official_page.domain.recruit.schema.Recruit;
import com.github.kmu_wink.wink_official_page.domain.recruit.schema.RecruitForm;
import com.github.kmu_wink.wink_official_page.domain.user.repository.PreUserRepository;
import com.github.kmu_wink.wink_official_page.domain.user.schema.PreUser;
import com.github.kmu_wink.wink_official_page.global.module.sms.SmsObject;
import com.github.kmu_wink.wink_official_page.global.module.sms.SmsSender;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminRecruitFormService {

    private final RecruitRepository recruitRepository;
    private final RecruitFormRepository recruitFormRepository;
    private final RecruitSmsRepository recruitSmsRepository;
    private final PreUserRepository preUserRepository;

    private final SmsSender smsSender;

    private final RandomString randomString;

    public void paperClear(String recruitId, String formId) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitNotFoundException::new);

        if (recruit.getStep() != Recruit.Step.PRE) {
            throw new AlreadyPaperEndedException();
        }

        RecruitForm recruitForm = recruitFormRepository.findByIdAndRecruit(formId, recruit)
                .orElseThrow(RecruitFormNotFoundException::new);

        recruitForm.setPaperPass(null);

        recruitFormRepository.save(recruitForm);
    }

    public void paperPass(String recruitId, String formId) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitNotFoundException::new);

        if (recruit.getStep() != Recruit.Step.PRE) {
            throw new AlreadyPaperEndedException();
        }

        RecruitForm recruitForm = recruitFormRepository.findByIdAndRecruit(formId, recruit)
                .orElseThrow(RecruitFormNotFoundException::new);

        recruitForm.setPaperPass(true);

        recruitFormRepository.save(recruitForm);
    }

    public void paperFail(String recruitId, String formId) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitNotFoundException::new);

        if (recruit.getStep() != Recruit.Step.PRE) {
            throw new AlreadyPaperEndedException();
        }

        RecruitForm recruitForm = recruitFormRepository.findByIdAndRecruit(formId, recruit)
                .orElseThrow(RecruitFormNotFoundException::new);

        recruitForm.setPaperPass(false);

        recruitFormRepository.save(recruitForm);
    }

    public void finalizePaper(String recruitId) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitNotFoundException::new);
        if (recruit.getStep() != Recruit.Step.PRE) {
            throw new AlreadyPaperEndedException();
        }

        LocalDateTime now = LocalDateTime.now();
        if (!now.isAfter(recruit.getRecruitEndDate().atTime(23, 59, 59))) {
            throw new NowIsRecruitingException();
        }

        List<RecruitForm> forms = recruitFormRepository.findAllByRecruit(recruit);
        if (smsSender.remain() < forms.size()) {
            throw new RemainSmsLackException();
        }

        RecruitSms sms = recruitSmsRepository.findByRecruit(recruit);
        if (sms.getPaperFail() == null || sms.getPaperPass() == null) {
            throw new SmsMessageIsEmptyException();
        }

        smsSender.send(forms.stream()
                .filter(form -> !form.getPaperPass())
                .map(form -> new SmsObject(form.getPhoneNumber(), RecruitSms.transform(sms.getPaperFail(), form)))
                .toList());

        smsSender.send(forms.stream()
                .filter(RecruitForm::getPaperPass)
                .map(form -> new SmsObject(form.getPhoneNumber(), RecruitSms.transform(sms.getPaperPass(), form)))
                .toList());

        recruit.setStep(Recruit.Step.PAPER_END);

        recruitRepository.save(recruit);
    }

    public void interviewClear(String recruitId, String formId) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitNotFoundException::new);

        if (recruit.getStep() != Recruit.Step.PAPER_END) {
            throw new AlreadyInterviewEndedException();
        }

        RecruitForm recruitForm = recruitFormRepository.findByIdAndRecruit(formId, recruit)
                .orElseThrow(RecruitFormNotFoundException::new);

        if (!recruitForm.getPaperPass()) {
            throw new ItsPaperFailedException();
        }

        recruitForm.setInterviewPass(null);

        recruitFormRepository.save(recruitForm);
    }

    public void interviewPass(String recruitId, String formId) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitNotFoundException::new);

        if (recruit.getStep() != Recruit.Step.PAPER_END) {
            throw new AlreadyInterviewEndedException();
        }

        RecruitForm recruitForm = recruitFormRepository.findByIdAndRecruit(formId, recruit)
                .orElseThrow(RecruitFormNotFoundException::new);

        if (!recruitForm.getPaperPass()) {
            throw new ItsPaperFailedException();
        }

        recruitForm.setInterviewPass(true);

        recruitFormRepository.save(recruitForm);
    }

    public void interviewFail(String recruitId, String formId) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitNotFoundException::new);

        if (recruit.getStep() != Recruit.Step.PAPER_END) {
            throw new AlreadyInterviewEndedException();
        }

        RecruitForm recruitForm = recruitFormRepository.findByIdAndRecruit(formId, recruit)
                .orElseThrow(RecruitFormNotFoundException::new);

        if (!recruitForm.getPaperPass()) {
            throw new ItsPaperFailedException();
        }

        recruitForm.setInterviewPass(false);

        recruitFormRepository.save(recruitForm);
    }

    public void finalizeInterview(String recruitId) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitNotFoundException::new);
        if (recruit.getStep() != Recruit.Step.PAPER_END) {
            throw new AlreadyInterviewEndedException();
        }

        List<RecruitForm> forms = recruitFormRepository.findAllByRecruit(recruit)
                .stream()
                .filter(RecruitForm::getPaperPass)
                .toList();
        if (smsSender.remain() < forms.size()) {
            throw new RemainSmsLackException();
        }

        RecruitSms sms = recruitSmsRepository.findByRecruit(recruit);
        if (sms.getPaperFail() == null || sms.getPaperPass() == null) {
            throw new SmsMessageIsEmptyException();
        }

        smsSender.send(forms.stream()
                .filter(form -> !form.getInterviewPass())
                .map(form -> new SmsObject(form.getPhoneNumber(), RecruitSms.transform(sms.getFinalFail(), form)))
                .toList());

        smsSender.send(forms.stream().filter(RecruitForm::getInterviewPass).map(form -> {
            PreUser preUser = preUserRepository.save(PreUser.builder()
                    .email(form.getEmail())
                    .name(form.getName())
                    .studentId(form.getStudentId())
                    .department(form.getDepartment())
                    .phoneNumber(form.getPhoneNumber())
                    .token(randomString.generate(128))
                    .test(false)
                    .build());

            return new SmsObject(form.getPhoneNumber(), RecruitSms.transform(sms.getFinalPass(), preUser));
        }).toList());

        recruit.setStep(Recruit.Step.INTERVIEW_END);

        recruitRepository.save(recruit);
    }

    public GetFormsResponse getForms(String recruitId) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitNotFoundException::new);

        List<RecruitForm> forms = recruitFormRepository.findAllByRecruitOrderByCreatedAtDesc(recruit)
                .stream()
                .peek(form -> form.setRecruit(null))
                .toList();

        return GetFormsResponse.builder().forms(forms).build();
    }
}
