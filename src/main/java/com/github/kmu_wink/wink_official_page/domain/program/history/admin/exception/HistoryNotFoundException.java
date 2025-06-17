package com.github.kmu_wink.wink_official_page.domain.program.history.admin.exception;

import com.github.kmu_wink.wink_official_page.global.exception.ApiException;
import org.springframework.http.HttpStatus;

public class HistoryNotFoundException extends ApiException {

    public HistoryNotFoundException() {

        super(HttpStatus.NOT_FOUND, "연혁을 찾을 수 없습니다.");
    }
}
