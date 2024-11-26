package com.github.kmu_wink.wink_official.common.external.aws.s3;

import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Component;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.Headers;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import com.amazonaws.services.s3.model.S3ObjectSummary;
import com.github.kmu_wink.wink_official.common.property.AwsProperty;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class S3Service {

    private final AwsProperty awsProperty;
    private final AmazonS3Client amazonS3Client;

    public List<S3ObjectSummary> files(String prefix) {
        return amazonS3Client.listObjects(awsProperty.getS3().getBucket(), prefix).getObjectSummaries();
    }

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

    public String urlToKey(String url) {

        return url.split("amazonaws.com/")[1];
    }
}
