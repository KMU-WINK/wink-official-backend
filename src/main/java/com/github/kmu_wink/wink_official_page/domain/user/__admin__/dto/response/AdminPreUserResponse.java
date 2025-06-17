package com.github.kmu_wink.wink_official_page.domain.user.__admin__.dto.response;

import com.github.kmu_wink.wink_official_page.domain.user.schema.PreUser;
import lombok.Builder;

@Builder
public record AdminPreUserResponse(

        PreUser user
) {

}