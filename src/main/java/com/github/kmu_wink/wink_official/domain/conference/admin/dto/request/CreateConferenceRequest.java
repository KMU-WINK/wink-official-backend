package com.github.kmu_wink.wink_official.domain.conference.admin.dto.request;

import com.github.kmu_wink.wink_official.common.validation.RegExp;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record CreateConferenceRequest(

	@NotBlank
	String location,

	@NotBlank
	@Pattern(regexp = RegExp.YYYY_MM_DD_HH_MM_EXPRESSION, message = RegExp.YYYY_MM_DD_HH_MM_MESSAGE)
	String date
) {
}
