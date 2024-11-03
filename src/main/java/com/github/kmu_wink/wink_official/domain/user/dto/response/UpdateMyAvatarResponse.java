package com.github.kmu_wink.wink_official.domain.user.dto.response;

import lombok.Builder;

@Builder
public record UpdateMyAvatarResponse(

        String url
) {
}
