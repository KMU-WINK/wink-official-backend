package com.github.kmu_wink.wink_official.domain.program.history.dto.request;

import com.github.kmu_wink.wink_official.common.validation.Validation;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;

@Builder
public record CreateHistoryRequest(

	@NotBlank
	String title,

	@NotBlank
	String description,

	@NotBlank
	@Pattern(regexp = Validation.URL_EXPRESSION, message = Validation.URL_MESSAGE)
	String image,

	@NotBlank
	@Pattern(regexp = Validation.YYYY_MM_DD_EXPRESSION, message = Validation.YYYY_MM_DD_MESSAGE)
	String date
) {
}
