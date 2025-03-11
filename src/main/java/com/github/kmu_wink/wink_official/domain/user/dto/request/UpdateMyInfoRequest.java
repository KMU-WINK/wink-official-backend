package com.github.kmu_wink.wink_official.domain.user.dto.request;

import com.github.kmu_wink.wink_official.common.validation.RegExp;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Builder;

@Builder
public record UpdateMyInfoRequest(

        @Nullable
        @Pattern(regexp = RegExp.URL_EXPRESSION, message = RegExp.URL_MESSAGE)
        String avatar,

        @Nullable
        @Size(max = 30)
        String description,

        @Nullable
        @Pattern(regexp = RegExp.GITHUB_USERNAME_EXPRESSION, message = RegExp.GITHUB_USERNAME_MESSAGE)
        String github,

        @Nullable
        @Pattern(regexp = RegExp.INSTAGRAM_EXPRESSION, message = RegExp.INSTAGRAM_MESSAGE)
        String instagram,

        @Nullable
        @Pattern(regexp = RegExp.URL_EXPRESSION, message = RegExp.URL_MESSAGE)
        String blog
) {
}
