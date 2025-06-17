package com.github.kmu_wink.wink_official_page.domain.user.dto.response;

import com.github.kmu_wink.wink_official_page.domain.user.schema.User;
import lombok.Builder;

import java.util.List;

@Builder
public record UsersResponse(

        List<User> users
) {

}