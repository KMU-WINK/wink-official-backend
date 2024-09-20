package com.github.kmu_wink.wink_official_backend;

import com.github.kmu_wink.wink_official_backend.common.property.AwsProperty;
import com.github.kmu_wink.wink_official_backend.common.property.JwtProperty;
import com.github.kmu_wink.wink_official_backend.common.property.RedisProperty;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
@EnableMongoAuditing
@EnableConfigurationProperties({AwsProperty.class, JwtProperty.class, RedisProperty.class})
public class WinkOfficialBackendApplication {

    public static void main(String[] args) {

        SpringApplication.run(WinkOfficialBackendApplication.class, args);
    }
}
