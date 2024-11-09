package com.github.kmu_wink.wink_official.domain.recruit.constant.techStack;

import com.github.kmu_wink.wink_official.domain.recruit.constant.FormCheckbox;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum BackendTechStack implements FormCheckbox {
	NODE_JS("Node.js"),
	EXPRESS("Express"),
	DJANGO("Django"),
	FLASK("Flask"),
	SPRING("Spring"),
	SPRING_BOOT("Spring Boot"),
	RUBY_ON_RAILS("Ruby on Rails"),
	LARAVEL("Laravel"),
	ASP_NET("ASP.NET"),
	GRAPHQL("GraphQL"),
	REST_API("REST API");

	private final String displayName;
}