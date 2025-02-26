
package com.github.kmu_wink.wink_official.domain.recruit.admin.sms.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.github.kmu_wink.wink_official.common.communicate.sms.SmsObject;
import com.github.kmu_wink.wink_official.common.communicate.sms.SmsSender;
import com.github.kmu_wink.wink_official.domain.recruit.admin.form.exception.SmsMessageIsEmptyException;
import com.github.kmu_wink.wink_official.domain.recruit.admin.sms.constant.TestSmsField;
import com.github.kmu_wink.wink_official.domain.recruit.admin.sms.dto.request.SendTestSmsRequest;
import com.github.kmu_wink.wink_official.domain.recruit.admin.sms.dto.request.UpdateRecruitSmsRequest;
import com.github.kmu_wink.wink_official.domain.recruit.admin.sms.dto.response.GetRecruitSmsResponse;
import com.github.kmu_wink.wink_official.domain.recruit.admin.sms.exception.RemainSmsLackException;
import com.github.kmu_wink.wink_official.domain.recruit.admin.sms.repository.RecruitSmsRepository;
import com.github.kmu_wink.wink_official.domain.recruit.admin.sms.schema.RecruitSms;
import com.github.kmu_wink.wink_official.domain.recruit.exception.RecruitNotFoundException;
import com.github.kmu_wink.wink_official.domain.recruit.repository.RecruitRepository;
import com.github.kmu_wink.wink_official.domain.recruit.schema.Recruit;
import com.github.kmu_wink.wink_official.domain.recruit.schema.RecruitForm;
import com.github.kmu_wink.wink_official.domain.user.schema.PreUser;
import com.github.kmu_wink.wink_official.domain.user.schema.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminRecruitSmsService {

    private final RecruitRepository recruitRepository;
    private final RecruitSmsRepository recruitSmsRepository;

    private final SmsSender smsSender;

    public GetRecruitSmsResponse getRecruitSms(String recruitId) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitNotFoundException::new);
        RecruitSms sms = recruitSmsRepository.findByRecruit(recruit);

        return GetRecruitSmsResponse.builder()
            .recruitSms(sms)
            .build();
    }

    public GetRecruitSmsResponse updateRecruitSms(String recruitId, UpdateRecruitSmsRequest dto) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitNotFoundException::new);
        RecruitSms sms = recruitSmsRepository.findByRecruit(recruit);

        sms.setPaperFail(dto.paperFail());
        sms.setPaperPass(dto.paperPass());
        sms.setFinalFail(dto.finalFail());
        sms.setFinalPass(dto.finalPass());
        sms = recruitSmsRepository.save(sms);

        return GetRecruitSmsResponse.builder()
            .recruitSms(sms)
            .build();
    }

    public void sendTestSms(String recruitId, SendTestSmsRequest dto, User user) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitNotFoundException::new);
        RecruitSms sms = recruitSmsRepository.findByRecruit(recruit);

        if (smsSender.remain() < 1) throw new RemainSmsLackException();

        if (sms.getPaperFail() == null || sms.getPaperPass() == null) throw new SmsMessageIsEmptyException();

        TestSmsField field = TestSmsField.valueOf(dto.field());

        String content = switch (field) {
            case PAPER_FAIL -> sms.getPaperFail();
            case PAPER_PASS -> sms.getPaperPass();
            case FINAL_FAIL -> sms.getFinalFail();
            case FINAL_PASS -> sms.getFinalPass();
        };

        String transform = field.equals(TestSmsField.FINAL_PASS)
            ? RecruitSms.transform(
                content,
                PreUser.builder()
                    .name(user.getName())
                    .studentId(user.getStudentId())
                    .department(user.getDepartment())
                    .email(user.getEmail())
                    .phoneNumber(user.getPhoneNumber())
                    .token(UUID.randomUUID().toString())
                    .build()
            )
            : RecruitSms.transform(
                content,
                RecruitForm.builder()
                    .name(user.getName())
                    .studentId(user.getStudentId())
                    .department(user.getDepartment())
                    .email(user.getEmail())
                    .phoneNumber(user.getPhoneNumber())
                    .build()
            );

        smsSender.send(List.of(new SmsObject(dto.phoneNumber(), transform)));
    }
}
