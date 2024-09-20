package com.github.kmu_wink.wink_official_backend.domain.auth.schema;

import com.github.kmu_wink.wink_official_backend.domain.user.schema.User;
import lombok.Builder;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;
import org.springframework.data.redis.core.index.Indexed;

import java.util.concurrent.TimeUnit;

@Builder
@RedisHash(value = "refresh_token")
public record RefreshToken(

        @Id
        Long id,

        @Indexed
        String token,

        User user,

        @TimeToLive(unit = TimeUnit.HOURS)
        long ttl
) {
}
