package com.github.kmu_wink.wink_official.domain.user.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

@Builder
public record RemovePreUserRequest(

        @NotBlank
        String id
) {
}
