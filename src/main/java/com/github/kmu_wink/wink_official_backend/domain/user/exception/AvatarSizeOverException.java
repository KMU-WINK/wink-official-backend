package com.github.kmu_wink.wink_official_backend.domain.user.exception;

import com.github.kmu_wink.wink_official_backend.common.api.exception.ApiException;
import org.springframework.http.HttpStatus;

public class AvatarSizeOverException extends ApiException {

    public AvatarSizeOverException() {

        super(HttpStatus.BAD_REQUEST, "프로필 사진이 너무 큽니다. 5MB 이하로 업로드해주세요.");
    }
}
