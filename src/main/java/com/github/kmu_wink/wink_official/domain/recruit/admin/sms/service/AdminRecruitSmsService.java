
package com.github.kmu_wink.wink_official.domain.recruit.admin.sms.service;

import org.springframework.stereotype.Service;

import com.github.kmu_wink.wink_official.domain.recruit.admin.sms.dto.request.UpdateRecruitSmsRequest;
import com.github.kmu_wink.wink_official.domain.recruit.admin.sms.dto.response.GetRecruitSmsResponse;
import com.github.kmu_wink.wink_official.domain.recruit.admin.sms.repository.RecruitSmsRepository;
import com.github.kmu_wink.wink_official.domain.recruit.admin.sms.schema.RecruitSms;
import com.github.kmu_wink.wink_official.domain.recruit.exception.RecruitNotFoundException;
import com.github.kmu_wink.wink_official.domain.recruit.repository.RecruitRepository;
import com.github.kmu_wink.wink_official.domain.recruit.schema.Recruit;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminRecruitSmsService {

    private final RecruitRepository recruitRepository;
    private final RecruitSmsRepository recruitSmsRepository;

    public GetRecruitSmsResponse getRecruitSms(String recruitId) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitNotFoundException::new);
        RecruitSms recruitSms = recruitSmsRepository.findByRecruit(recruit);

        return GetRecruitSmsResponse.builder()
            .recruitSms(recruitSms)
            .build();
    }

    public GetRecruitSmsResponse updateRecruitSms(String recruitId, UpdateRecruitSmsRequest dto) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitNotFoundException::new);
        RecruitSms recruitSms = recruitSmsRepository.findByRecruit(recruit);

        recruitSms.setPaperFail(dto.paperFail());
        recruitSms.setPaperPass(dto.paperPass());
        recruitSms.setFinalFail(dto.finalFail());
        recruitSms.setFinalPass(dto.finalPass());
        recruitSms = recruitSmsRepository.save(recruitSms);

        return GetRecruitSmsResponse.builder()
            .recruitSms(recruitSms)
            .build();
    }
}
