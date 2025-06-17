package com.github.kmu_wink.wink_official_page.domain.program.activity.admin.exception;

import com.github.kmu_wink.wink_official_page.global.exception.ApiException;
import org.springframework.http.HttpStatus;

public class ActivityNotFoundException extends ApiException {

	public ActivityNotFoundException() {
		super(HttpStatus.NOT_FOUND, "활동을 찾을 수 없습니다.");
	}
}
