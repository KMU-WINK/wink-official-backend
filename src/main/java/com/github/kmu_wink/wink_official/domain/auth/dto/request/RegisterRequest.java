package com.github.kmu_wink.wink_official.domain.auth.dto.request;

import com.github.kmu_wink.wink_official.common.regexp.RegExp;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;
import org.hibernate.validator.constraints.Length;

@Builder
public record RegisterRequest(

        @NotBlank
        String token,

        @NotBlank
        @Pattern(regexp = RegExp.PASSWORD_EXPRESSION, message = RegExp.PASSWORD_MESSAGE)
        String password,

        @Nullable
        @Length(max = 40)
        String description,

        @Nullable
        @Pattern(regexp = RegExp.GITHUB_EXPRESSION, message = RegExp.GITHUB_MESSAGE)
        String github,

        @Nullable
        @Pattern(regexp = RegExp.INSTAGRAM_EXPRESSION, message = RegExp.INSTAGRAM_MESSAGE)
        String instagram,

        @Nullable
        @Pattern(regexp = RegExp.BLOG_EXPRESSION, message = RegExp.BLOG_MESSAGE)
        String blog
) {
}
