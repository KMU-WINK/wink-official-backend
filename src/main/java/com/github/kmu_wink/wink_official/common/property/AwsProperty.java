package com.github.kmu_wink.wink_official.common.property;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.NestedConfigurationProperty;
import org.springframework.context.annotation.Configuration;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
@Configuration
@ConfigurationProperties(prefix = "app.cloud.aws")
public class AwsProperty {

    @NotBlank
    private String region;

    @NestedConfigurationProperty
    private S3 s3;

    @NestedConfigurationProperty
    private Credential credential;

    @Data
    public static class S3 {

        @NotBlank
        private String bucket;
    }

    @Data
    public static class Credential {

        @NotBlank
        private String accessKey;

        @NotBlank
        private String secretKey;
    }
}
