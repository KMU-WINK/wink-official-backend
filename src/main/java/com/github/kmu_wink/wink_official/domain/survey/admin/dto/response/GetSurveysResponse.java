package com.github.kmu_wink.wink_official.domain.survey.admin.dto.response;

import java.util.List;

import com.github.kmu_wink.wink_official.domain.survey.schema.Survey;

import lombok.Builder;

@Builder
public record GetSurveysResponse(

	List<Survey> surveys
) {
}
