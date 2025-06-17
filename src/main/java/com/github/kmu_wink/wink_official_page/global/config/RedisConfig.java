package com.github.kmu_wink.wink_official_page.global.config;

import com.github.kmu_wink.wink_official_page.global.property.RedisProperty;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;
import org.springframework.data.redis.connection.RedisConfiguration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;

@Configuration
@RequiredArgsConstructor
@EnableRedisRepositories(
    basePackages = "com.github.kmu_wink.wink_official_page",
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
