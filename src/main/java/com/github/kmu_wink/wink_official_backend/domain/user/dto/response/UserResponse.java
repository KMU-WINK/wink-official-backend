package com.github.kmu_wink.wink_official_backend.domain.user.dto.response;

import com.github.kmu_wink.wink_official_backend.domain.user.schema.User;
import lombok.Builder;

@Builder
public record UserResponse(

        User user
) {
}
