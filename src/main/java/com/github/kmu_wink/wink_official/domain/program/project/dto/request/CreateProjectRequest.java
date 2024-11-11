package com.github.kmu_wink.wink_official.domain.program.project.dto.request;

import java.util.List;

import com.github.kmu_wink.wink_official.common.validation.Validation;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;

@Builder
public record CreateProjectRequest(

	@NotBlank
	String title,

	@NotBlank
	String content,

	@NotNull
	List<@NotBlank String> tags,

	@Nullable
	List<@Pattern(regexp = Validation.GITHUB_PROJECT_URL_EXPRESSION, message = Validation.GITHUB_PROJECT_URL_MESSAGE) String> githubLinks,

	@NotNull
	List<@Pattern(regexp = Validation.OBJECT_ID_EXPRESSION, message =  Validation.OBJECT_ID_MESSAGE) String> users
) {
}
