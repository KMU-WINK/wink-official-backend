package com.github.kmu_wink.wink_official_page.domain.program.project.exception;

import com.github.kmu_wink.wink_official_page.global.exception.ApiException;
import org.springframework.http.HttpStatus;

public class NotOwnedProjectException extends ApiException {

	public NotOwnedProjectException() {
		super(HttpStatus.UNAUTHORIZED, "소유한 프로젝트가 아닙니다.");
	}
}
