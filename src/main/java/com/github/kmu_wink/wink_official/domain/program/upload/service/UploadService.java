package com.github.kmu_wink.wink_official.domain.program.upload.service;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.github.kmu_wink.wink_official.common.external.aws.s3.S3Service;
import com.github.kmu_wink.wink_official.domain.program.upload.dto.response.UploadImageResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UploadService {

	private final S3Service s3Service;

	public UploadImageResponse uploadImage() {

		String url = s3Service.generatePresignedUrl("program/%s".formatted(UUID.randomUUID().toString()));

		return UploadImageResponse.builder()
			.url(url)
			.build();
	}
}
