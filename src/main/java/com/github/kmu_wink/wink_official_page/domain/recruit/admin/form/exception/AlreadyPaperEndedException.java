package com.github.kmu_wink.wink_official_page.domain.recruit.admin.form.exception;

import com.github.kmu_wink.wink_official_page.global.exception.ApiException;
import org.springframework.http.HttpStatus;

public class AlreadyPaperEndedException extends ApiException {

    public AlreadyPaperEndedException() {

        super(HttpStatus.BAD_REQUEST, "서류 결과가 확정된 상태입니다.");
    }
}
