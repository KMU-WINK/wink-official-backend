package com.github.kmu_wink.wink_official_page.domain.recruit.exception;

import com.github.kmu_wink.wink_official_page.global.exception.ApiExceptionCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum RecruitExceptionCode implements ApiExceptionCode {
    NOT_FOUND("모집을 찾을 수 없습니다."),
    NOT_RECRUIT_PERIOD("모집 기간이 아닙니다."),
    NOT_VALID_INTERVIEW_DATES("면접 날짜가 유효하지 않습니다."),
    INVALID_RECRUIT_FORM("유효하지 않은 신청서입니다."),
    ALREADY_RECRUIT_SUBMITTED("이미 신청서가 제출되었습니다."),
    ALREADY_MEMBER("이미 가입된 사용자입니다.")
    ;

    private final String message;
}
