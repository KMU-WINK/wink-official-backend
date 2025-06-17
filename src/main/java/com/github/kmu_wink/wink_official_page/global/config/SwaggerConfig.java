package com.github.kmu_wink.wink_official_page.global.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI() {

        return new OpenAPI()
                .components(new Components().addSecuritySchemes("JWT", securityScheme()))
                .info(info());
    }

    private Info info() {

        return new Info()
                .title("Wink 공식 홈페이지")
                .description("국민대학교 소프트웨어융합대학 웹 학술 동아리 | WINK")
                .version("2.0");
    }

    private SecurityScheme securityScheme() {

        return new SecurityScheme()
                .type(SecurityScheme.Type.HTTP)
                .bearerFormat("JWT")
                .scheme("bearer");
    }}
