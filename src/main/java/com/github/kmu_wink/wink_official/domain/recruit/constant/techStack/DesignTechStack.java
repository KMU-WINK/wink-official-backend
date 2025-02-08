package com.github.kmu_wink.wink_official.domain.recruit.constant.techStack;

import com.github.kmu_wink.wink_official.domain.recruit.constant.FormCheckbox;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor

public enum DesignTechStack implements FormCheckbox {
	// UI/UX 디자인
	FIGMA("Figma"),
	SKETCH("Sketch"),
	ADOBE_XD("Adobe XD"),

	// 그래픽 디자인
	PHOTOSHOP("Adobe Photoshop"),
	ILLUSTRATOR("Adobe Illustrator"),

	// 프로토타이핑
	PROTOPIE("ProtoPie"),
	FRAMER("Framer"),

	// 협업
	ZEPLIN("Zeplin"),
	INVISION("InVision");

	private final String displayName;
}