package com.github.kmu_wink.wink_official.domain.conference.dto.response;

import com.github.kmu_wink.wink_official.domain.conference.schema.Conference;

import lombok.Builder;

@Builder
public record GetConferenceResponse(

	Conference conference
) {
}
