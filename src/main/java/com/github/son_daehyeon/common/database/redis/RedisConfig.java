package com.github.son_daehyeon.common.database.redis;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;
import org.springframework.data.redis.connection.RedisConfiguration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;

import com.github.son_daehyeon.common.property.RedisProperty;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
@EnableRedisRepositories(
    basePackages = "com.github.son_daehyeon",
    includeFilters = @ComponentScan.Filter(
        type = FilterType.REGEX,
        pattern = ".*\\.repository\\..*Redis.*"
    )
)
public class RedisConfig {

    private final RedisProperty redisProperty;

    @Bean
    public RedisConfiguration redisConfiguration() {

        RedisStandaloneConfiguration redisStandaloneConfiguration = new RedisStandaloneConfiguration();
        redisStandaloneConfiguration.setHostName(redisProperty.getHost());
        redisStandaloneConfiguration.setPort(redisProperty.getPort());
        redisStandaloneConfiguration.setPassword(redisProperty.getPassword());

        return redisStandaloneConfiguration;
    }

    @Bean
    public RedisConnectionFactory connectionFactory() {

        return new LettuceConnectionFactory(redisConfiguration());
    }
}
