package com.github.kmu_wink.wink_official.domain.recruit.admin.sms.dto.response;

import com.github.kmu_wink.wink_official.domain.recruit.admin.sms.schema.RecruitSms;

import lombok.Builder;

@Builder
public record GetRecruitSmsResponse(

        RecruitSms recruitSms
) {
}
