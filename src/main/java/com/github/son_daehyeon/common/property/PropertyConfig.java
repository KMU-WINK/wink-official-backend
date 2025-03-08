package com.github.son_daehyeon.common.property;

import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationPropertiesScan(basePackages = "com.github.son_daehyeon.common.property")
public class PropertyConfig {
}
