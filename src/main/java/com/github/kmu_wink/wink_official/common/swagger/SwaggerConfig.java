package com.github.kmu_wink.wink_official.common.swagger;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI() {

    return new OpenAPI()
            .info(info());
    }

    private Info info() {
        return new Info()
                .title("Wink 공식 홈페이지")
                .description("국민대학교 소프트웨어융합대학 웹 학술 동아리 | WINK")
                .version("1.0");
    }
}
