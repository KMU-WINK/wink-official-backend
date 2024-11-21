package com.github.kmu_wink.wink_official.domain.recruit.constant.techStack;

import com.github.kmu_wink.wink_official.domain.recruit.constant.FormCheckbox;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum DesignTechStack implements FormCheckbox {
	FIGMA("Figma"),
	FRAMER("Framer"),
	SKETCH("Sketch"),
	ADOBE_XD("Adobe XD"),
	PHOTOSHOP("Adobe Photoshop"),
	ILLUSTRATOR("Adobe Illustrator"),
	;

	private final String displayName;
}