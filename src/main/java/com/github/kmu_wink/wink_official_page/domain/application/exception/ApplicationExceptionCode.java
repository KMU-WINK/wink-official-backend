package com.github.kmu_wink.wink_official_page.domain.application.exception;

import com.github.kmu_wink.wink_official_page.global.exception.ApiExceptionCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ApplicationExceptionCode implements ApiExceptionCode {
    NOT_FOUND("애플리케이션을 찾을 수 없습니다."),
    INVALID_SECRET("애플리케이션 시크릿이 올바르지 않습니다."),
    OAUTH_NOT_SUPPORTED("OAuth가 비활성화된 상태입니다."),
    OAUTH_TOKEN_NOT_FOUND("OAuth 토큰을 찾을 수 없습니다."),
    ;

    private final String message;
}
