package com.github.kmu_wink.wink_official_backend.domain.user.exception;

import com.github.kmu_wink.wink_official_backend.common.api.exception.ApiException;
import org.springframework.http.HttpStatus;

public class AvatarSizeUnderException extends ApiException {

    public AvatarSizeUnderException() {

        super(HttpStatus.BAD_REQUEST, "프로필 사진이 너무 작습니다. 최소 180x180 크기의 이미지를 업로드해주세요.");
    }
}
