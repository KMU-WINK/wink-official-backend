package com.github.kmu_wink.wink_official_backend.domain.auth.exception;

import com.github.kmu_wink.wink_official_backend.common.api.exception.ApiException;
import org.springframework.http.HttpStatus;

public class AlreadyRegisteredStudentIdException extends ApiException {

    public AlreadyRegisteredStudentIdException() {

        super(HttpStatus.CONFLICT, "이미 등록된 학번입니다.");
    }
}
