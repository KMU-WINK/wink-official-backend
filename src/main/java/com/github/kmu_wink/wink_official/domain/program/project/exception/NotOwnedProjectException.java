package com.github.kmu_wink.wink_official.domain.program.project.exception;

import org.springframework.http.HttpStatus;

import com.github.kmu_wink.wink_official.common.api.exception.ApiException;

public class NotOwnedProjectException extends ApiException {

	public NotOwnedProjectException() {
		super(HttpStatus.UNAUTHORIZED, "소유한 프로젝트가 아닙니다.");
	}
}
