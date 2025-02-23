package com.github.kmu_wink.wink_official.domain.survey.admin.dto.request;

import java.util.List;

import com.github.kmu_wink.wink_official.common.validation.RegExp;
import com.github.kmu_wink.wink_official.common.validation.custom.Enum;
import com.github.kmu_wink.wink_official.domain.survey.admin.constant.SurveyItemType;
import com.github.kmu_wink.wink_official.domain.survey.admin.util.validation.FormItemValidate;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CreateSurveyRequest(
	
	@NotBlank
	String title,

	String description,

	@NotBlank
	@Pattern(regexp = RegExp.YYYY_MM_DD_EXPRESSION, message = RegExp.YYYY_MM_DD_MESSAGE)
	String start,

	@NotBlank
	@Pattern(regexp = RegExp.YYYY_MM_DD_EXPRESSION, message = RegExp.YYYY_MM_DD_MESSAGE)
	String end,

	@Valid
	@NotNull
	@Size(min = 1, max = 100)
	List<FormItem> items
) {

	@FormItemValidate
	public record FormItem(

		@NotBlank
		@Enum(enumClass = SurveyItemType.class)
		String type,

		@NotBlank
		String title,

		String description,

		boolean require,

		List<String> options,

		Boolean other
	) {
	}
}
