package com.github.kmu_wink.wink_official.domain.program.activity.admin.dto.request;

import java.util.List;

import com.github.kmu_wink.wink_official.common.validation.RegExp;

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
	List<@Pattern(regexp = RegExp.URL_EXPRESSION, message = RegExp.URL_MESSAGE) String> images
) {
}
