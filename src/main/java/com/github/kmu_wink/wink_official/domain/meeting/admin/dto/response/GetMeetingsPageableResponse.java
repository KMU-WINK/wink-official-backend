package com.github.kmu_wink.wink_official.domain.meeting.admin.dto.response;

import org.springframework.data.domain.Page;

import com.github.kmu_wink.wink_official.domain.meeting.schema.Meeting;

import lombok.Builder;

@Builder
public record GetMeetingsPageableResponse(

	Page<Meeting> meetings
) {
}
