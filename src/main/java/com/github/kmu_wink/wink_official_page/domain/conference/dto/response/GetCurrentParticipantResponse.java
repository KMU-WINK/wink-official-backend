package com.github.kmu_wink.wink_official_page.domain.conference.dto.response;

import lombok.Builder;

@Builder
public record GetCurrentParticipantResponse(

	boolean survey,
	boolean present
) {
}
