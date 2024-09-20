package com.github.kmu_wink.wink_official_backend.domain.user.dto.response;

import com.github.kmu_wink.wink_official_backend.domain.user.schema.User;
import lombok.Builder;

import java.util.List;

@Builder
public record UserListResponse(

        List<User> users
) {
}
