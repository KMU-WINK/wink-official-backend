package com.github.son_daehyeon;

import java.util.TimeZone;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.github.son_daehyeon.common.property.JwtProperty;
import com.github.son_daehyeon.common.property.RedisProperty;

@SpringBootApplication
@EnableConfigurationProperties({JwtProperty.class, RedisProperty.class})
public class Application {

    public static void main(String[] args) {

        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
        SpringApplication.run(Application.class, args);
    }
}
