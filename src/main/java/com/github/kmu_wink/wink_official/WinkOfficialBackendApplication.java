package com.github.kmu_wink.wink_official;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

import com.github.kmu_wink.wink_official.common.property.AwsProperty;
import com.github.kmu_wink.wink_official.common.property.GoogleProperty;
import com.github.kmu_wink.wink_official.common.property.JwtProperty;
import com.github.kmu_wink.wink_official.common.property.RedisProperty;

@SpringBootApplication
@EnableAsync
@EnableScheduling
@EnableConfigurationProperties({AwsProperty.class, GoogleProperty.class, JwtProperty.class, RedisProperty.class})
public class WinkOfficialBackendApplication {

    public static void main(String[] args) {

        SpringApplication.run(WinkOfficialBackendApplication.class, args);
    }
}
