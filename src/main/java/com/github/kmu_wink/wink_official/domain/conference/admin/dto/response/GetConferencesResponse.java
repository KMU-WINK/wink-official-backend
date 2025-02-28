package com.github.kmu_wink.wink_official.domain.conference.admin.dto.response;

import java.util.List;

import com.github.kmu_wink.wink_official.domain.conference.schema.Conference;

import lombok.Builder;

@Builder
public record GetConferencesResponse(

	List<Conference> conferences
) {
}
