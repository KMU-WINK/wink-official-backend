package com.github.kmu_wink.wink_official.domain.application.dto.request;

import java.util.List;

import com.github.kmu_wink.wink_official.common.validation.RegExp;
import com.github.kmu_wink.wink_official.common.validation.custom.Enum;
import com.github.kmu_wink.wink_official.domain.application.schema.Application;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;

@Builder
public record UpdateApplicationLoginRequest(

	boolean enable,

	@NotNull
	List<@Pattern(regexp = RegExp.URL_EXPRESSION, message = RegExp.URL_MESSAGE) String> urls,

	@NotNull
	List<@Enum(enumClass = Application.Login.Scope.class) String> scopes
) {
}
