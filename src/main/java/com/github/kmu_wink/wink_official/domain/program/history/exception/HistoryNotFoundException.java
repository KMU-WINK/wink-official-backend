package com.github.kmu_wink.wink_official.domain.program.history.exception;

import org.springframework.http.HttpStatus;

import com.github.kmu_wink.wink_official.common.api.exception.ApiException;

public class HistoryNotFoundException extends ApiException {

	public HistoryNotFoundException() {
		super(HttpStatus.NOT_FOUND, "연혁을 찾을 수 없습니다.");
	}
}
