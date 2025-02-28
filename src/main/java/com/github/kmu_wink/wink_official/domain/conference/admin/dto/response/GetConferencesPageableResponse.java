package com.github.kmu_wink.wink_official.domain.conference.admin.dto.response;

import org.springframework.data.domain.Page;

import com.github.kmu_wink.wink_official.domain.conference.schema.Conference;

import lombok.Builder;

@Builder
public record GetConferencesPageableResponse(

	Page<Conference> conferences
) {
}
