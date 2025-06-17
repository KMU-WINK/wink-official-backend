package com.github.kmu_wink.wink_official_page.domain.program.project.exception;

import com.github.kmu_wink.wink_official_page.global.exception.ApiException;
import org.springframework.http.HttpStatus;

public class ProjectNotFoundException extends ApiException {

    public ProjectNotFoundException() {

        super(HttpStatus.NOT_FOUND, "프로젝트를 찾을 수 없습니다.");
    }
}
