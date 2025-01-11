package com.github.kmu_wink.wink_official.domain.application.dto.request;

import java.util.List;

import com.github.kmu_wink.wink_official.common.validation.Validation;
import com.github.kmu_wink.wink_official.common.validation.custom.Enum;
import com.github.kmu_wink.wink_official.domain.application.schema.Application;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;

@Builder
public record UpdateApplicationLoginRequest(

	boolean enable,

	@NotNull
	List<@Pattern(regexp = Validation.URL_EXPRESSION, message = Validation.URL_MESSAGE) String> urls,

	@NotNull
	List<@Enum(enumClass = Application.Login.Scope.class) String> scopes
) {
}
