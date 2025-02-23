package com.github.kmu_wink.wink_official.domain.meeting.exception;

import org.springframework.http.HttpStatus;

import com.github.kmu_wink.wink_official.common.api.exception.ApiException;

public class MeetingNotFoundException extends ApiException {

	public MeetingNotFoundException() {

		super(HttpStatus.NOT_FOUND, "정기 총회를 찾을 수 없습니다");
	}
}
