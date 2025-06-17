package com.github.kmu_wink.wink_official_page.domain.recruit.__admin__.exception;

import com.github.kmu_wink.wink_official_page.global.exception.ApiException;
import org.springframework.http.HttpStatus;

public class AlreadySameRecruitExistsException extends ApiException {

    public AlreadySameRecruitExistsException() {

        super(HttpStatus.CONFLICT, "이미 해당 학년도, 학기의 모집이 존재합니다.");
    }
}
