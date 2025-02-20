package com.github.kmu_wink.wink_official.domain.application.dto.response;

import java.util.List;
import java.util.Map;

import com.github.kmu_wink.wink_official.domain.application.schema.Application;

import lombok.Builder;

@Builder
public record OauthTokenResponse(

	Map<String, Object> user,

	List<Application.Login.Scope> scopes
) {
}
