package com.github.kmu_wink.wink_official.domain.recruit.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Domain implements FormCheckbox {
	FRONTEND("프론트엔드"),
	BACKEND("백엔드"),
	DESIGN("디자이너"),
	PM("기획자");

	private final String displayName;
}