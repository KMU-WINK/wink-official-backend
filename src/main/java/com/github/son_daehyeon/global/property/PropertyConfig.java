package com.github.son_daehyeon.global.property;

import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationPropertiesScan(basePackages = "com.github.son_daehyeon.global.property")
public class PropertyConfig {
}
