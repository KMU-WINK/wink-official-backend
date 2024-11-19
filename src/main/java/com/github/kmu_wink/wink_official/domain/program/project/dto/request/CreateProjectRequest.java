package com.github.kmu_wink.wink_official.domain.program.project.dto.request;

import com.github.kmu_wink.wink_official.common.validation.Validation;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;

@Builder
public record CreateProjectRequest(

	@NotBlank
	String title,

	@NotBlank
	@Pattern(regexp = Validation.URL_EXPRESSION, message = Validation.URL_MESSAGE)
	String image,

	@NotBlank
	@Pattern(regexp = Validation.GITHUB_PROJECT_URL_EXPRESSION, message = Validation.GITHUB_PROJECT_URL_MESSAGE)
	String link
) {
}
