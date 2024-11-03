package com.github.kmu_wink.wink_official.domain.user.dto.request;

import com.github.kmu_wink.wink_official.common.validation.Validation;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;
import org.hibernate.validator.constraints.Length;

@Builder
public record UpdateMyInfoRequest(

        @Nullable
        @Length(max = 40)
        String description,

        @Nullable
        @Pattern(regexp = Validation.GITHUB_EXPRESSION, message = Validation.GITHUB_MESSAGE)
        String github,

        @Nullable
        @Pattern(regexp = Validation.INSTAGRAM_EXPRESSION, message = Validation.INSTAGRAM_MESSAGE)
        String instagram,

        @Nullable
        @Pattern(regexp = Validation.BLOG_EXPRESSION, message = Validation.BLOG_MESSAGE)
        String blog
) {
}
