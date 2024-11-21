package com.github.kmu_wink.wink_official.domain.recruit.constant.techStack;

import com.github.kmu_wink.wink_official.domain.recruit.constant.FormCheckbox;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum FrontendTechStack implements FormCheckbox {
	HTML("HTML"),
	CSS("CSS"),
	SCSS("SCSS"),
	SASS("SASS"),
	JAVASCRIPT("JavaScript"),

	REACT("React"),
	VUE("Vue.js"),
	ANGULAR("Angular"),
	SVELTE("Svelte"),
	NEXT_JS("Next.js"),
	NUXT_JS("Nuxt.js"),
	JQUERY("jQuery"),

	TAILWIND_CSS("Tailwind CSS"),
	BOOTSTRAP("Bootstrap"),
	MATERIAL_UI("Material-UI"),
	STYLED_COMPONENT("Styled Component"),

	REDUX("Redux"),
	MOBX("MobX"),
	RECOIL("Recoil"),
	ZUSTAND("Zustand"),
	CONTEXT_API("Context API"),
	;

	private final String displayName;
}