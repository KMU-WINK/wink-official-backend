package com.github.kmu_wink.wink_official.domain.program.activity.exception;

import org.springframework.http.HttpStatus;

import com.github.kmu_wink.wink_official.common.api.exception.ApiException;

public class ActivityNotFoundException extends ApiException {

	public ActivityNotFoundException() {
		super(HttpStatus.NOT_FOUND, "활동을 찾을 수 없습니다.");
	}
}
