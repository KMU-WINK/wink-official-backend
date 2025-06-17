package com.github.kmu_wink.wink_official_page.domain.user.__admin__.dto.response;

import com.github.kmu_wink.wink_official_page.domain.user.schema.User;
import lombok.Builder;
import org.springframework.data.domain.Page;

@Builder
public record AdminUsersResponse(

        Page<User> users
) {

}