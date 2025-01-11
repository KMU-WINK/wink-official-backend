package com.github.kmu_wink.wink_official.domain.application.dto.response;

import java.util.List;

import com.github.kmu_wink.wink_official.domain.application.schema.Application;
import com.github.kmu_wink.wink_official.domain.user.schema.User;

import lombok.Builder;

@Builder
public record OauthTokenResponse(

	User user,

	List<Application.Login.Scope> scopes
) {
}
