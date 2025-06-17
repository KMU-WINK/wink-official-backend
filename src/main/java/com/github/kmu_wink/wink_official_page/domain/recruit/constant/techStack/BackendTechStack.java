package com.github.kmu_wink.wink_official_page.domain.recruit.constant.techStack;

import com.github.kmu_wink.wink_official_page.domain.recruit.constant.FormCheckbox;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum BackendTechStack implements FormCheckbox {
    // 언어
    JAVASCRIPT("JavaScript"),
    TYPESCRIPT("TypeScript"),
    JAVA("Java"),
    PYTHON("Python"),

    // 프레임워크
    EXPRESS("Express"),
    NESTJS("Nest.js"),
    SPRING_BOOT("Spring Boot"),
    DJANGO("Django"),
    FLASK("Flask"),
    FASTAPI("FastAPI"),

    // 데이터베이스
    MYSQL("MySQL"),
    MARIADB("MariaDB"),
    POSTGRESQL("PostgreSQL"),
    MONGODB("MongoDB"),
    REDIS("Redis"),
    ELASTICSEARCH("Elasticsearch"),

    // ORM
    TYPEORM("TypeORM"),
    PRISMA("Prisma"),
    SEQUELIZE("Sequelize"),
    JPA("JPA"),
    HIBERNATE("Hibernate"),

    // API
    GRAPHQL("GraphQL"),
    REST("REST"),
    GRPC("gRPC"),
    WEBSOCKET("WebSocket"),

    // 메시지 큐
    KAFKA("Apache Kafka"),
    RABBITMQ("RabbitMQ"),

    // 인증
    JWT("JWT"),
    OAUTH("OAuth"),

    // 테스팅
    JUNIT("JUnit"),
    JEST("Jest");

    private final String displayName;
}