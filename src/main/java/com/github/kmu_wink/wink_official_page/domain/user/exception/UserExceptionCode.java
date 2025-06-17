package com.github.kmu_wink.wink_official_page.domain.user.exception;

import com.github.kmu_wink.wink_official_page.global.exception.ApiExceptionCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum UserExceptionCode implements ApiExceptionCode {
    NOT_FOUND("사용자를 찾을 수 없습니다."),
    ;

    private final String message;
}
