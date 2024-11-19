package com.github.kmu_wink.wink_official.common.external.aws.s3;

import java.util.Date;

import org.springframework.stereotype.Component;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.Headers;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import com.github.kmu_wink.wink_official.common.property.AwsProperty;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class S3Service {

    private final AwsProperty awsProperty;
    private final AmazonS3Client amazonS3Client;

    public String generatePresignedUrl(String path) {
        GeneratePresignedUrlRequest generatePresignedUrlRequest = new GeneratePresignedUrlRequest(awsProperty.getS3().getBucket(), path)
                .withMethod(HttpMethod.PUT)
                .withExpiration(new Date(System.currentTimeMillis() + 1000 * 60));

        generatePresignedUrlRequest.addRequestParameter(Headers.S3_CANNED_ACL, CannedAccessControlList.PublicRead.toString());

        return amazonS3Client.generatePresignedUrl(generatePresignedUrlRequest).toString();
    }

    public void deleteFile(String path) {

        amazonS3Client.deleteObject(awsProperty.getS3().getBucket(), path);
    }
}
