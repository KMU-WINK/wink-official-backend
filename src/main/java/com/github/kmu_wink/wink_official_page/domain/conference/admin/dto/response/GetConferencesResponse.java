package com.github.kmu_wink.wink_official_page.domain.conference.admin.dto.response;

import java.util.List;

import com.github.kmu_wink.wink_official_page.domain.conference.schema.Conference;

import lombok.Builder;

@Builder
public record GetConferencesResponse(

	List<Conference> conferences
) {
}
