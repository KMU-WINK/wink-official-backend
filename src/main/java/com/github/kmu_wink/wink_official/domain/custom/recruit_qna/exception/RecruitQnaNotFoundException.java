package com.github.kmu_wink.wink_official.domain.custom.recruit_qna.exception;

import org.springframework.http.HttpStatus;

import com.github.kmu_wink.wink_official.common.api.exception.ApiException;

public class RecruitQnaNotFoundException extends ApiException {

	public RecruitQnaNotFoundException() {

		super(HttpStatus.NOT_FOUND, "Recruit Q&A를 찾을 수 없습니다.");
	}
}
