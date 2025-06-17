package com.github.kmu_wink.wink_official_page.domain.application.dto.response;

import com.github.kmu_wink.wink_official_page.domain.application.schema.Application;
import lombok.Builder;

import java.util.List;
import java.util.Map;

@Builder
public record OauthTokenResponse(

        Map<String, Object> user,

        List<Application.Login.Scope> scopes
) {

}
