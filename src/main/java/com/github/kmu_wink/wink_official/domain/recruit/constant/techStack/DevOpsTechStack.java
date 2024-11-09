package com.github.kmu_wink.wink_official.domain.recruit.constant.techStack;

import com.github.kmu_wink.wink_official.domain.recruit.constant.FormCheckbox;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum DevOpsTechStack implements FormCheckbox {
	DOCKER("Docker"),
	KUBERNETES("Kubernetes"),
	AWS("AWS"),
	GCP("Google Cloud Platform"),
	AZURE("Azure"),
	CI_CD("CI/CD");

	private final String displayName;
}