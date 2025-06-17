package com.github.kmu_wink.wink_official_page.domain.program.project.exception;

import com.github.kmu_wink.wink_official_page.global.exception.ApiExceptionCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ProjectExceptionCode implements ApiExceptionCode {
    NOT_FOUND("프로젝트를 찾을 수 없습니다."),
    NOT_OWNER("프로젝트의 소유자가 아닙니다."),
    ;

    private final String message;
}
