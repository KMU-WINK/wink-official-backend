package com.github.kmu_wink.wink_official_page.domain.recruit.admin.form.dto.response;

import com.github.kmu_wink.wink_official_page.domain.recruit.schema.RecruitForm;
import lombok.Builder;

import java.util.List;

@Builder
public record GetFormsResponse(

        List<RecruitForm> forms
) {

}
