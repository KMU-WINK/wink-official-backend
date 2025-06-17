package com.github.kmu_wink.wink_official_page.domain.program.upload.service;

import com.github.kmu_wink.wink_official_page.domain.program.upload.dto.response.UploadImageResponse;
import com.github.kmu_wink.wink_official_page.global.infra.s3.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UploadService {

    private final S3Service s3Service;

    public UploadImageResponse uploadImage() {

        String url = s3Service.generatePresignedUrl("program/%s".formatted(UUID.randomUUID().toString()));

        return UploadImageResponse.builder().url(url).build();
    }
}
