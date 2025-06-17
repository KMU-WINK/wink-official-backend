package com.github.kmu_wink.wink_official_page.domain.recruit.admin.form.exception;

import com.github.kmu_wink.wink_official_page.global.exception.ApiException;
import org.springframework.http.HttpStatus;

public class ItsPaperFailedException extends ApiException {

    public ItsPaperFailedException() {

        super(HttpStatus.BAD_REQUEST, "서류에서 탈락된 지원자입니다.");
    }
}
