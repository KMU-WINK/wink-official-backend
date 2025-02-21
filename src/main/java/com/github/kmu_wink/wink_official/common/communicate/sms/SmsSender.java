package com.github.kmu_wink.wink_official.common.communicate.sms;

import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import com.github.kmu_wink.wink_official.common.api.exception.ApiException;
import com.github.kmu_wink.wink_official.common.property.SmsProperty;

import kong.unirest.core.HttpResponse;
import kong.unirest.core.Unirest;
import kong.unirest.core.UnirestInstance;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class SmsSender {

    private final SmsProperty smsProperty;

    public void send(Collection<SmsObject> smsObjects) {

        try (UnirestInstance instance = Unirest.spawnInstance()) {

            HttpResponse<String> response = instance.post("https://www.munja123.com/Remote/RemoteMms.html")
                .header("Content-Type", "application/x-www-form-urlencoded")
                .field("remote_id", smsProperty.getId())
                .field("remote_pass", smsProperty.getPw())
                .field("remote_callback", smsProperty.getSendPhone())
                .field("remote_num", "1")
                .field("remote_phone", smsObjects.stream().map(SmsObject::target).collect(Collectors.joining(",")))
                .field("remote_msg", smsObjects.stream().map(SmsObject::content).collect(Collectors.joining("__LINE__")))
                .asString();

            if (!response.getBody().startsWith("0000") && !response.getBody().startsWith("0004")) {

                throw new ApiException(HttpStatus.INTERNAL_SERVER_ERROR, "문자 API 오류: %s".formatted(response.getBody().split("\\|")[0]));
            }
        }
    }

    public int remain() {

        try (UnirestInstance instance = Unirest.spawnInstance()) {

            HttpResponse<String> response = instance.post("https://www.munja123.com/Remote/RemoteCheck.html")
                .header("Content-Type", "application/x-www-form-urlencoded")
                .field("remote_id", smsProperty.getId())
                .field("remote_pass", smsProperty.getPw())
                .field("remote_request", "lms")
                .asString();

            if (!response.getBody().startsWith("0000")) {

                throw new ApiException(HttpStatus.INTERNAL_SERVER_ERROR, "문자 API 오류: %s".formatted(response.getBody().split("\\|")[0]));
            }

            return Integer.parseInt(response.getBody().split("\\|")[2]);
        }
    }
}