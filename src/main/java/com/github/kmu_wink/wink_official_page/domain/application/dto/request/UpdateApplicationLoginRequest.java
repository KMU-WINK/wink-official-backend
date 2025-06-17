package com.github.kmu_wink.wink_official_page.domain.application.dto.request;

import com.github.kmu_wink.wink_official_page.domain.application.schema.Application;
import com.github.kmu_wink.wink_official_page.global.util.RegExp;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;

import java.util.List;

@Builder
public record UpdateApplicationLoginRequest(

        boolean enable,

        @NotNull
        List<@Pattern(regexp = RegExp.URL_EXPRESSION, message = RegExp.URL_MESSAGE) String> urls,

        @NotNull
        List<Application.Login.Scope> scopes
) {

}
