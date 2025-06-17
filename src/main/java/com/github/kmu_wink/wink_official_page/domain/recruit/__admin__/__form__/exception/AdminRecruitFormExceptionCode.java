package com.github.kmu_wink.wink_official_page.domain.recruit.__admin__.__form__.exception;

import com.github.kmu_wink.wink_official_page.global.exception.ApiExceptionCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum AdminRecruitFormExceptionCode implements ApiExceptionCode {
    NOT_FOUND("모집이 존재하지 않습니다."),
    RECRUITING("모집이 진행 중입니다."),
    PAPER_FAILED_USER("서류에 통과하지 못한 사용자입니다."),
    ALREADY_INTERVIEW_ENDED("이미 면접이 종료되었습니다."),
    ALREADY_PAPER_ENDED("이미 서류가 종료되었습니다."),
    ;

    private final String message;
}
