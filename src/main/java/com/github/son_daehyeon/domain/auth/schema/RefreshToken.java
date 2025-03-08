package com.github.son_daehyeon.domain.auth.schema;

import java.util.concurrent.TimeUnit;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;
import org.springframework.data.redis.core.index.Indexed;

import lombok.Builder;

@Builder
@RedisHash(value = "refresh_token")
public record RefreshToken(

	@Id
	Long id,

	@Indexed
	String token,

	String userId,

	@TimeToLive(unit = TimeUnit.HOURS)
	long ttl
) {
}