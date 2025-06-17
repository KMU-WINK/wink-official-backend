package com.github.kmu_wink.wink_official_page.domain.program.history.__admin__.exception;

import com.github.kmu_wink.wink_official_page.global.exception.ApiExceptionCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum HistoryAdminExceptionCode implements ApiExceptionCode {
    NOT_FOUND("연혁을 찾을 수 없습니다."),
    ;

    private final String message;
}
