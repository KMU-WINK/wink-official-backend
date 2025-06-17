package com.github.kmu_wink.wink_official_page.domain.recruit.__admin__.form.exception;

import com.github.kmu_wink.wink_official_page.global.exception.ApiException;
import org.springframework.http.HttpStatus;

public class AlreadyInterviewEndedException extends ApiException {

    public AlreadyInterviewEndedException() {

        super(HttpStatus.BAD_REQUEST, "면접 결과가 확정된 상태입니다.");
    }
}
