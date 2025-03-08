package com.github.son_daehyeon.global.database.mariadb;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.web.config.EnableSpringDataWebSupport;

@Configuration
@EnableJpaRepositories(
	basePackages = "com.github.son_daehyeon",
	excludeFilters = @ComponentScan.Filter(
		type = FilterType.REGEX,
		pattern = ".*\\.repository\\..*Redis.*"
	)
)
@EnableJpaAuditing
@EnableSpringDataWebSupport(pageSerializationMode = EnableSpringDataWebSupport.PageSerializationMode.VIA_DTO)
public class MariaDbConfig {
}
