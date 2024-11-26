package com.github.kmu_wink.wink_official.domain.program.activity.dto.request;

import java.util.List;

import com.github.kmu_wink.wink_official.common.validation.Validation;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;

@Builder
public record CreateActivityRequest(

	@NotBlank
	String title,

	@NotBlank
	String description,

	@NotNull
	List<@Pattern(regexp = Validation.URL_EXPRESSION, message = Validation.URL_MESSAGE) String> images
) {
}