package com.github.kmu_wink.wink_official_backend.domain.user.exception;

import com.github.kmu_wink.wink_official_backend.common.api.exception.ApiException;
import org.springframework.http.HttpStatus;

public class AvatarNotImageException extends ApiException {

    public AvatarNotImageException() {

        super(HttpStatus.BAD_REQUEST, "프로필 사진이 이미지 파일이 아닙니다.");
    }
}
