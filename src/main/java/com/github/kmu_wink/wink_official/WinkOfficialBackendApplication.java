package com.github.kmu_wink.wink_official;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableAsync
@EnableScheduling
@SpringBootApplication
public class WinkOfficialBackendApplication {

    public static void main(String[] args) {

        SpringApplication.run(WinkOfficialBackendApplication.class, args);
    }
}
