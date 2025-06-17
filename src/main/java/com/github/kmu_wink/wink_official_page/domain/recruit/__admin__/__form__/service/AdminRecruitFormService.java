package com.github.kmu_wink.wink_official_page.domain.recruit.__admin__.__form__.service;

import com.github.kmu_wink.wink_official_page.domain.recruit.__admin__.__form__.dto.response.GetFormsResponse;
import com.github.kmu_wink.wink_official_page.domain.recruit.__admin__.__form__.exception.AdminRecruitFormExceptionCode;
import com.github.kmu_wink.wink_official_page.domain.recruit.__admin__.__sms__.exception.AdminRecruitSmsExceptionCode;
import com.github.kmu_wink.wink_official_page.domain.recruit.__admin__.__sms__.repository.RecruitSmsRepository;
import com.github.kmu_wink.wink_official_page.domain.recruit.__admin__.__sms__.schema.RecruitSms;
import com.github.kmu_wink.wink_official_page.domain.recruit.exception.RecruitExceptionCode;
import com.github.kmu_wink.wink_official_page.domain.recruit.repository.RecruitFormRepository;
import com.github.kmu_wink.wink_official_page.domain.recruit.repository.RecruitRepository;
import com.github.kmu_wink.wink_official_page.domain.recruit.schema.Recruit;
import com.github.kmu_wink.wink_official_page.domain.recruit.schema.RecruitForm;
import com.github.kmu_wink.wink_official_page.domain.user.repository.PreUserRepository;
import com.github.kmu_wink.wink_official_page.domain.user.schema.PreUser;
import com.github.kmu_wink.wink_official_page.global.module.sms.SmsObject;
import com.github.kmu_wink.wink_official_page.global.module.sms.SmsSender;
import com.github.kmu_wink.wink_official_page.global.util.RandomString;
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

    public void paperClear(String recruitId, String formId) {

        Recruit recruit = recruitRepository.findById(recruitId)
                .orElseThrow(RecruitExceptionCode.NOT_RECRUIT_PERIOD::toException);

        if (recruit.getStep() != Recruit.Step.PRE) {
            throw AdminRecruitFormExceptionCode.ALREADY_PAPER_ENDED.toException();
        }

        RecruitForm recruitForm = recruitFormRepository.findByIdAndRecruit(formId, recruit)
                .orElseThrow(AdminRecruitFormExceptionCode.NOT_FOUND::toException);

        recruitForm.setPaperPass(null);

        recruitFormRepository.save(recruitForm);
    }

    public void paperPass(String recruitId, String formId) {

        Recruit recruit = recruitRepository.findById(recruitId)
                .orElseThrow(RecruitExceptionCode.NOT_FOUND::toException);

        if (recruit.getStep() != Recruit.Step.PRE) {
            throw AdminRecruitFormExceptionCode.ALREADY_PAPER_ENDED.toException();
        }

        RecruitForm recruitForm = recruitFormRepository.findByIdAndRecruit(formId, recruit)
                .orElseThrow(AdminRecruitFormExceptionCode.NOT_FOUND::toException);

        recruitForm.setPaperPass(true);

        recruitFormRepository.save(recruitForm);
    }

    public void paperFail(String recruitId, String formId) {

        Recruit recruit = recruitRepository.findById(recruitId)
                .orElseThrow(RecruitExceptionCode.NOT_FOUND::toException);

        if (recruit.getStep() != Recruit.Step.PRE) {
            throw AdminRecruitFormExceptionCode.ALREADY_PAPER_ENDED.toException();
        }

        RecruitForm recruitForm = recruitFormRepository.findByIdAndRecruit(formId, recruit)
                .orElseThrow(AdminRecruitFormExceptionCode.NOT_FOUND::toException);

        recruitForm.setPaperPass(false);

        recruitFormRepository.save(recruitForm);
    }

    public void finalizePaper(String recruitId) {

        Recruit recruit = recruitRepository.findById(recruitId)
                .orElseThrow(RecruitExceptionCode.NOT_FOUND::toException);
        if (recruit.getStep() != Recruit.Step.PRE) {
            throw AdminRecruitFormExceptionCode.ALREADY_PAPER_ENDED.toException();
        }

        LocalDateTime now = LocalDateTime.now();
        if (!now.isAfter(recruit.getRecruitEndDate().atTime(23, 59, 59))) {
            throw AdminRecruitFormExceptionCode.RECRUITING.toException();
        }

        List<RecruitForm> forms = recruitFormRepository.findAllByRecruit(recruit);
        if (smsSender.remain() < forms.size()) {
            throw AdminRecruitSmsExceptionCode.LACK_SMS_CREDIT.toException();
        }

        RecruitSms sms = recruitSmsRepository.findByRecruit(recruit);
        if (sms.getPaperFail() == null || sms.getPaperPass() == null) {
            throw AdminRecruitSmsExceptionCode.MESSAGE_IS_EMPTY.toException();
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

        Recruit recruit = recruitRepository.findById(recruitId)
                .orElseThrow(RecruitExceptionCode.NOT_FOUND::toException);

        if (recruit.getStep() != Recruit.Step.PAPER_END) {
            throw AdminRecruitFormExceptionCode.ALREADY_INTERVIEW_ENDED.toException();
        }

        RecruitForm recruitForm = recruitFormRepository.findByIdAndRecruit(formId, recruit)
                .orElseThrow(AdminRecruitFormExceptionCode.NOT_FOUND::toException);

        if (!recruitForm.getPaperPass()) {
            throw AdminRecruitFormExceptionCode.PAPER_FAILED_USER.toException();
        }

        recruitForm.setInterviewPass(null);

        recruitFormRepository.save(recruitForm);
    }

    public void interviewPass(String recruitId, String formId) {

        Recruit recruit = recruitRepository.findById(recruitId)
                .orElseThrow(RecruitExceptionCode.NOT_FOUND::toException);

        if (recruit.getStep() != Recruit.Step.PAPER_END) {
            throw AdminRecruitFormExceptionCode.ALREADY_INTERVIEW_ENDED.toException();
        }

        RecruitForm recruitForm = recruitFormRepository.findByIdAndRecruit(formId, recruit)
                .orElseThrow(AdminRecruitFormExceptionCode.NOT_FOUND::toException);

        if (!recruitForm.getPaperPass()) {
            throw AdminRecruitFormExceptionCode.PAPER_FAILED_USER.toException();
        }

        recruitForm.setInterviewPass(true);

        recruitFormRepository.save(recruitForm);
    }

    public void interviewFail(String recruitId, String formId) {

        Recruit recruit = recruitRepository.findById(recruitId)
                .orElseThrow(RecruitExceptionCode.NOT_FOUND::toException);

        if (recruit.getStep() != Recruit.Step.PAPER_END) {
            throw AdminRecruitFormExceptionCode.ALREADY_INTERVIEW_ENDED.toException();
        }

        RecruitForm recruitForm = recruitFormRepository.findByIdAndRecruit(formId, recruit)
                .orElseThrow(AdminRecruitFormExceptionCode.NOT_FOUND::toException);

        if (!recruitForm.getPaperPass()) {
            throw AdminRecruitFormExceptionCode.PAPER_FAILED_USER.toException();
        }

        recruitForm.setInterviewPass(false);

        recruitFormRepository.save(recruitForm);
    }

    public void finalizeInterview(String recruitId) {

        Recruit recruit = recruitRepository.findById(recruitId)
                .orElseThrow(RecruitExceptionCode.NOT_FOUND::toException);
        if (recruit.getStep() != Recruit.Step.PAPER_END) {
            throw AdminRecruitFormExceptionCode.ALREADY_INTERVIEW_ENDED.toException();
        }

        List<RecruitForm> forms = recruitFormRepository.findAllByRecruit(recruit)
                .stream()
                .filter(RecruitForm::getPaperPass)
                .toList();
        if (smsSender.remain() < forms.size()) {
            throw AdminRecruitSmsExceptionCode.LACK_SMS_CREDIT.toException();
        }

        RecruitSms sms = recruitSmsRepository.findByRecruit(recruit);
        if (sms.getFinalFail() == null || sms.getFinalPass() == null) {
            throw AdminRecruitSmsExceptionCode.MESSAGE_IS_EMPTY.toException();
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
                    .token(RandomString.generate(128))
                    .test(false)
                    .build());

            return new SmsObject(form.getPhoneNumber(), RecruitSms.transform(sms.getFinalPass(), preUser));
        }).toList());

        recruit.setStep(Recruit.Step.INTERVIEW_END);

        recruitRepository.save(recruit);
    }

    public GetFormsResponse getForms(String recruitId) {

        Recruit recruit = recruitRepository.findById(recruitId)
                .orElseThrow(RecruitExceptionCode.NOT_FOUND::toException);

        List<RecruitForm> forms = recruitFormRepository.findAllByRecruitOrderByCreatedAtDesc(recruit)
                .stream()
                .peek(form -> form.setRecruit(null))
                .toList();

        return GetFormsResponse.builder().forms(forms).build();
    }
}
