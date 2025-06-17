package com.github.kmu_wink.wink_official_page.domain.recruit.admin.form.exception;

import com.github.kmu_wink.wink_official_page.global.exception.ApiException;
import org.springframework.http.HttpStatus;

public class RecruitFormNotFoundException extends ApiException {

    public RecruitFormNotFoundException() {

        super(HttpStatus.NOT_FOUND, "지원서를 찾을 수 없습니다.");
    }
}
