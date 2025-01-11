package com.github.kmu_wink.wink_official.domain.application.dto.response;

import lombok.Builder;

@Builder
public record OauthLoginResponse(

	String token
) {
}
