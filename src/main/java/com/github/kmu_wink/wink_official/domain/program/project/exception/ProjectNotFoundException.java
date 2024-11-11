package com.github.kmu_wink.wink_official.domain.program.project.exception;

import org.springframework.http.HttpStatus;

import com.github.kmu_wink.wink_official.common.api.exception.ApiException;

public class ProjectNotFoundException extends ApiException {

	public ProjectNotFoundException() {
		super(HttpStatus.NOT_FOUND, "프로젝트를 찾을 수 없습니다.");
	}
}
