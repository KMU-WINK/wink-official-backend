package com.github.kmu_wink.wink_official_backend.common.property;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ConfigurationProperties(prefix = "app.jwt")
public class JwtProperty {

    @NotBlank
    private String key;

    @NotNull
    private Integer accessTokenExpirationHours;

    @NotNull
    private Integer refreshTokenExpirationHours;
}
