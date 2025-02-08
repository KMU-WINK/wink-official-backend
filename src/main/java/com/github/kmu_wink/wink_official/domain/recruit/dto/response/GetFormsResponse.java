package com.github.kmu_wink.wink_official.domain.recruit.dto.response;

import java.util.List;

import com.github.kmu_wink.wink_official.domain.recruit.schema.RecruitForm;

import lombok.Builder;

@Builder
public record GetFormsResponse(

        List<RecruitForm> forms
) {
}
