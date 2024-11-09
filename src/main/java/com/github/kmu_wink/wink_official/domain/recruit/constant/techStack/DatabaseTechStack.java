package com.github.kmu_wink.wink_official.domain.recruit.constant.techStack;

import com.github.kmu_wink.wink_official.domain.recruit.constant.FormCheckbox;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum DatabaseTechStack implements FormCheckbox {
	MYSQL("MySQL"),
	POSTGRESQL("PostgreSQL"),
	MONGODB("MongoDB"),
	FIREBASE("Firebase"),
	REDIS("Redis"),
	SQLITE("SQLite"),
	ORACLE("Oracle");

	private final String displayName;
}