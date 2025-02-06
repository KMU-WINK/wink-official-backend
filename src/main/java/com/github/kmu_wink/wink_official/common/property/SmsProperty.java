package com.github.kmu_wink.wink_official.common.property;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
@Configuration
@ConfigurationProperties(prefix = "sms")
public class SmsProperty {

    private boolean enabled;

    @NotBlank
    private String id;

    @NotBlank
    private String pw;

    @NotBlank
    private String sendPhone;
}
