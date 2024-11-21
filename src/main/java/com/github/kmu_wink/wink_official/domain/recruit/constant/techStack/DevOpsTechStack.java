package com.github.kmu_wink.wink_official.domain.recruit.constant.techStack;

import com.github.kmu_wink.wink_official.domain.recruit.constant.FormCheckbox;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum DevOpsTechStack implements FormCheckbox {
	AWS("Amazon Web Service"),
	GCP("Google Cloud Platform"),
	AZURE("Microsoft Azure"),

	DOCKER("Docker"),
	KUBERNETES("Kubernetes"),

	JENKINS("Jenkins"),
	GITHUB_ACTIONS("GitHub Actions"),
	;

	private final String displayName;
}