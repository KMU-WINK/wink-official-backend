package com.github.kmu_wink.wink_official_page.global.exception;

public interface ApiExceptionCode {

    String getMessage();

    default ApiException toException() {

        return new ApiException(this);
    }
}
