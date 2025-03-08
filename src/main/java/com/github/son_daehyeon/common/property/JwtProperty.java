package com.github.son_daehyeon.common.property;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
@Configuration
@ConfigurationProperties(prefix = "app.jwt")
public class JwtProperty {

	@NotBlank
	private String key;

	@Min(1)
	private int accessTokenExpirationHours;

	@Min(1)
	private int refreshTokenExpirationHours;
}
