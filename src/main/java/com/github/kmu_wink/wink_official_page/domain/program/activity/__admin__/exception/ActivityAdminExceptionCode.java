package com.github.kmu_wink.wink_official_page.domain.program.activity.__admin__.exception;

import com.github.kmu_wink.wink_official_page.global.exception.ApiExceptionCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ActivityAdminExceptionCode implements ApiExceptionCode {
    NOT_FOUND("활동을 찾을 수 없습니다."),
    ;

    private final String message;
}
