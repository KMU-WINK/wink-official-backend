package com.github.kmu_wink.wink_official_page.domain.auth.schema;

import lombok.Builder;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

@Builder
@RedisHash(value = "password_reset_token", timeToLive = 60 * 60)
public record PasswordResetToken(

        @Id
        Long id,

        @Indexed
        String token,

        String userId
) {

}
