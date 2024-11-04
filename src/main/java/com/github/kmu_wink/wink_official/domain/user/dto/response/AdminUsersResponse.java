package com.github.kmu_wink.wink_official.domain.user.dto.response;

import com.github.kmu_wink.wink_official.domain.user.schema.User;
import lombok.Builder;
import org.springframework.data.domain.Page;

@Builder
public record AdminUsersResponse(

        Page<User> users
) {
}