package com.github.kmu_wink.wink_official_page.domain.recruit.admin.form.exception;

import com.github.kmu_wink.wink_official_page.global.exception.ApiException;
import org.springframework.http.HttpStatus;

public class NowIsRecruitingException extends ApiException {

    public NowIsRecruitingException() {

        super(HttpStatus.BAD_REQUEST, "모집 기간이 종료 후 가능합니다.");
    }
}
