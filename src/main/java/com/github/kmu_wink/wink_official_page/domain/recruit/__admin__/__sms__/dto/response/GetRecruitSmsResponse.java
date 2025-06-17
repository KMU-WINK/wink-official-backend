package com.github.kmu_wink.wink_official_page.domain.recruit.__admin__.__sms__.dto.response;

import com.github.kmu_wink.wink_official_page.domain.recruit.__admin__.__sms__.schema.RecruitSms;
import lombok.Builder;

@Builder
public record GetRecruitSmsResponse(

        RecruitSms recruitSms
) {

}
