package com.github.kmu_wink.wink_official_page.global.infra.s3;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.Headers;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3ObjectSummary;
import com.github.kmu_wink.wink_official_page.global.property.AwsProperty;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.io.File;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class S3Service {

    private final AwsProperty awsProperty;
    private final AmazonS3Client amazonS3Client;

    public List<S3ObjectSummary> files(String prefix) {

        return amazonS3Client.listObjects(awsProperty.getS3().getBucket(), prefix).getObjectSummaries();
    }

    public String upload(String path, File file) {

        amazonS3Client.putObject(new PutObjectRequest(awsProperty.getS3().getBucket(), path, file).withCannedAcl(
                CannedAccessControlList.PublicRead));

        return amazonS3Client.getUrl(awsProperty.getS3().getBucket(), path).toString();
    }

    public String generatePresignedUrl(String path) {

        GeneratePresignedUrlRequest generatePresignedUrlRequest = new GeneratePresignedUrlRequest(
                awsProperty.getS3()
                        .getBucket(), path
        ).withMethod(HttpMethod.PUT).withExpiration(new Date(System.currentTimeMillis() + 1000 * 60));

        generatePresignedUrlRequest.addRequestParameter(
                Headers.S3_CANNED_ACL,
                CannedAccessControlList.PublicRead.toString()
        );

        return amazonS3Client.generatePresignedUrl(generatePresignedUrlRequest).toString();
    }

    public void delete(String path) {

        amazonS3Client.deleteObject(awsProperty.getS3().getBucket(), path);
    }

    public Optional<String> urlToKey(String url) {

        if (!url.contains("amazonaws.com/")) {
            return Optional.empty();
        }

        return Optional.of(url.split("amazonaws.com/")[1]);
    }
}
