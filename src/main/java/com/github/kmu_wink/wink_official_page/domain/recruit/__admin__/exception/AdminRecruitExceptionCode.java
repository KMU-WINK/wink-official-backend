package com.github.kmu_wink.wink_official_page.domain.recruit.__admin__.exception;

import com.github.kmu_wink.wink_official_page.global.exception.ApiExceptionCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum AdminRecruitExceptionCode implements ApiExceptionCode {
    ALREADY_EXISTS("이미 해당 학년도, 학기의 모집이 존재합니다."),
    ;

    private final String message;
}
