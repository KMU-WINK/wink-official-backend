package com.github.kmu_wink.wink_official.domain.survey.dto.response;

import com.github.kmu_wink.wink_official.domain.survey.schema.Survey;

import lombok.Builder;

@Builder
public record GetSurveyResponse(

	Survey survey
) {
}
