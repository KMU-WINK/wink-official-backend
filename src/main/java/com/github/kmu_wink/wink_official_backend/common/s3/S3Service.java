package com.github.kmu_wink.wink_official_backend.common.s3;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.github.kmu_wink.wink_official_backend.common.property.AwsProperty;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;

@Component
@RequiredArgsConstructor
public class S3Service {

    private final AwsProperty awsProperty;
    private final AmazonS3Client amazonS3Client;

    @SneakyThrows(IOException.class)
    public String uploadFile(String key, MultipartFile file) {

        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType(file.getContentType());
        objectMetadata.setContentLength(file.getSize());

        return uploadFile(key, file.getInputStream(), objectMetadata);
    }

    public String uploadFile(String key, InputStream inputStream, ObjectMetadata objectMetadata) {

        PutObjectRequest putObjectRequest = new PutObjectRequest(awsProperty.getS3().getBucket(), key, inputStream, objectMetadata)
                .withCannedAcl(CannedAccessControlList.PublicRead);

        amazonS3Client.putObject(putObjectRequest);

        return "https://" + awsProperty.getS3().getBucket() + ".s3." + awsProperty.getRegion() + ".amazonaws.com/" + key;
    }

    public void deleteFile(String key) {

        amazonS3Client.deleteObject(awsProperty.getS3().getBucket(), key);
    }
}
