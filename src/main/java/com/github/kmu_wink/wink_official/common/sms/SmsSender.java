package com.github.kmu_wink.wink_official.common.sms;

import java.util.Collection;
import java.util.List;

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

    public void send(String target, String message) {

        send(List.of(target), message);
    }

    public void send(String target, SmsTemplate template) {

        send(List.of(target), template);
    }

    public void send(Collection<String> targets, SmsTemplate template) {

        send(targets, template.getContent());
    }

    public void send(Collection<String> targets, String message) {

        try (UnirestInstance instance = Unirest.spawnInstance()) {

            HttpResponse<String> response = instance.post("https://www.munja123.com/Remote/RemoteMms.html")
                .header("Content-Type", "application/x-www-form-urlencoded")
                .field("remote_id", smsProperty.getId())
                .field("remote_pass", smsProperty.getPw())
                .field("remote_num", "1")
                .field("remote_phone", String.join(",", targets))
                .field("remote_callback", smsProperty.getSendPhone())
                .field("remote_msg", message)
                .asString();

            if (!response.getBody().startsWith("0000")) {

                throw new ApiException(HttpStatus.INTERNAL_SERVER_ERROR, "문자박사 API 오류: %s".formatted(response.getBody().split("\\|")[0]));
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

                throw new ApiException(HttpStatus.INTERNAL_SERVER_ERROR, "문자박사 API 오류: %s".formatted(response.getBody().split("\\|")[0]));
            }

            return Integer.parseInt(response.getBody().split("\\|")[2]);
        }
    }
}