package com.github.kmu_wink.wink_official.domain.recruit.constant.techStack;

import com.github.kmu_wink.wink_official.domain.recruit.constant.FormCheckbox;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum FrontendTechStack implements FormCheckbox {
	// 기본 웹 기술
	HTML("HTML"),
	CSS("CSS"),
	JAVASCRIPT("JavaScript"),
	TYPESCRIPT("TypeScript"),

	// CSS 전처리기/프레임워크
	SCSS("SCSS"),
	SASS("SASS"),
	TAILWIND_CSS("Tailwind CSS"),
	BOOTSTRAP("Bootstrap"),
	MATERIAL_UI("Material-UI"),
	STYLED_COMPONENT("Styled Component"),
	EMOTION("Emotion"),

	// 프레임워크/라이브러리
	REACT("React"),
	VUE("Vue.js"),
	ANGULAR("Angular"),
	SVELTE("Svelte"),
	NEXT_JS("Next.js"),
	NUXT_JS("Nuxt.js"),
	JQUERY("jQuery"),

	// 상태관리
	REDUX("Redux"),
	MOBX("MobX"),
	RECOIL("Recoil"),
	ZUSTAND("Zustand"),
	CONTEXT_API("Context API"),
	JOTAI("Jotai"),

	// 테스팅
	JEST("Jest"),
	TESTING_LIBRARY("Testing Library"),
	CYPRESS("Cypress"),
	STORYBOOK("Storybook"),

	// API
	GRAPHQL("GraphQL"),
	REACT_QUERY("React Query"),
	APOLLO_CLIENT("Apollo Client"),
	SWR("SWR"),
	;

	private final String displayName;
}