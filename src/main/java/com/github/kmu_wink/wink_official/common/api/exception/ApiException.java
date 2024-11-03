package com.github.kmu_wink.wink_official.common.api.exception;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor(access = AccessLevel.PROTECTED)
public class ApiException extends RuntimeException {

    private final HttpStatus httpStatus;
    private final String message;
}
