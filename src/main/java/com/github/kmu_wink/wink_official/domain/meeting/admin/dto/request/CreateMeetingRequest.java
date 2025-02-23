package com.github.kmu_wink.wink_official.domain.meeting.admin.dto.request;

import com.github.kmu_wink.wink_official.common.validation.RegExp;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record CreateMeetingRequest(

	@NotBlank
	@Pattern(regexp = RegExp.YYYY_MM_DD_EXPRESSION, message = RegExp.YYYY_MM_DD_MESSAGE)
	String date
) {
}
