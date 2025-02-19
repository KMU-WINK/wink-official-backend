package com.github.kmu_wink.wink_official.domain.program.project.dto.request;

import com.github.kmu_wink.wink_official.common.validation.RegExp;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;

@Builder
public record CreateProjectRequest(

	@NotBlank
	String title,

	@NotBlank
	@Pattern(regexp = RegExp.URL_EXPRESSION, message = RegExp.URL_MESSAGE)
	String image,

	@NotBlank
	@Pattern(regexp = RegExp.GITHUB_PROJECT_URL_EXPRESSION, message = RegExp.GITHUB_PROJECT_URL_MESSAGE)
	String link
) {
}
