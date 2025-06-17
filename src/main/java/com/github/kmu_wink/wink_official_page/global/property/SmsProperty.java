package com.github.kmu_wink.wink_official_page.global.property;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ConfigurationProperties(prefix = "app.sms")
public class SmsProperty {

    @NotBlank
    private String id;

    @NotBlank
    private String pw;

    @NotBlank
    private String sendPhone;
}
