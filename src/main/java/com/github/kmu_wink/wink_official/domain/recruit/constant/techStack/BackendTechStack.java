package com.github.kmu_wink.wink_official.domain.recruit.constant.techStack;

import com.github.kmu_wink.wink_official.domain.recruit.constant.FormCheckbox;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum BackendTechStack implements FormCheckbox {
	EXPRESS("Express"),
	NESTJS("Nest.js"),
	SPRING_BOOT("Spring Boot"),
	DJANGO("Django"),
	FLASK("Flask"),
	FASTAPI("FastAPI"),
	RUBY_ON_RAILS("Ruby on Rails"),
	LARAVEL("Laravel"),
	ASP_NET("ASP.NET"),

	MYSQL("MySQL"),
	MARIADB("MariaDB"),
	POSTGRESQL("PostgreSQL"),
	MONGODB("MongoDB"),
	REDIS("Redis"),
	;

	private final String displayName;
}