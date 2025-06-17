package com.github.kmu_wink.wink_official_page.domain.recruit.exception;

import com.github.kmu_wink.wink_official_page.global.exception.ApiException;
import org.springframework.http.HttpStatus;

public class InvalidRecruitFormException extends ApiException {

    public InvalidRecruitFormException() {

        super(HttpStatus.BAD_REQUEST, "잘못된 지원 양식입니다.");
    }
}
