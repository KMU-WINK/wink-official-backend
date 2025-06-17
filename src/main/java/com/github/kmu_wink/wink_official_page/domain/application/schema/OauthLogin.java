package com.github.kmu_wink.wink_official_page.domain.application.schema;

import lombok.Builder;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import java.util.List;

@Builder
@RedisHash(value = "oauth_login", timeToLive = 60 * 15)
public record OauthLogin(

        @Id
        Long id,

        @Indexed
        String token,

        String clientId,

        String userId,

        List<Application.Login.Scope> scopes
) {

}
