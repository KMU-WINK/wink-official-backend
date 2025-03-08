package com.github.son_daehyeon.global.api;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public class ApiException extends RuntimeException {

    private final HttpStatus status;
    private final String message;
}
