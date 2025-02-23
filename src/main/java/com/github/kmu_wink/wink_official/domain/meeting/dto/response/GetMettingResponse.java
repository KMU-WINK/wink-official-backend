package com.github.kmu_wink.wink_official.domain.meeting.dto.response;

import com.github.kmu_wink.wink_official.domain.meeting.schema.Meeting;

import lombok.Builder;

@Builder
public record GetMettingResponse(

	Meeting meeting
) {
}
