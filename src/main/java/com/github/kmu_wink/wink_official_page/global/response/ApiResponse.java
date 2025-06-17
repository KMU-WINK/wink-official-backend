package com.github.kmu_wink.wink_official_page.global.response;

import lombok.AccessLevel;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class ApiResponse<T> {

    private final boolean success;
    private final String error;
    private final T content;

    public static ApiResponse<Void> ok() {

        return new ApiResponse<>(true, null, null);
    }

    public static <T> ApiResponse<T> ok(T content) {

        return new ApiResponse<>(true, null, content);
    }

    public static <T> ApiResponse<T> error(String error) {

        return new ApiResponse<>(false, error, null);
    }
}
