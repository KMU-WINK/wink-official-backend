package com.github.kmu_wink.wink_official.domain.recruit.constant.techStack;

import com.github.kmu_wink.wink_official.domain.recruit.constant.FormCheckbox;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum DesignTechStack implements FormCheckbox {
	FIGMA("Figma"),
	ADOBE_XD("Adobe XD"),
	SKETCH("Sketch"),
	INVISION("InVision"),
	AXURE("Axure"),
	FRAMER("Framer");

	private final String displayName;
}