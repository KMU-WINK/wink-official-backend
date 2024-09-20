package com.github.kmu_wink.wink_official_backend;

import com.github.kmu_wink.wink_official_backend.common.property.JwtProperty;
import com.github.kmu_wink.wink_official_backend.common.property.MongoProperty;
import com.github.kmu_wink.wink_official_backend.common.property.RedisProperty;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
@EnableConfigurationProperties({MongoProperty.class, RedisProperty.class, JwtProperty.class})
public class WinkOfficialBackendApplication {

    public static void main(String[] args) {

        SpringApplication.run(WinkOfficialBackendApplication.class, args);
    }
}
