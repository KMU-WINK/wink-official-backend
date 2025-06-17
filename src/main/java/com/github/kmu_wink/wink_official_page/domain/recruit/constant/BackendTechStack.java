package com.github.kmu_wink.wink_official_page.domain.recruit.constant;

public enum BackendTechStack implements TechStack {
    // 언어
    JAVASCRIPT,
    TYPESCRIPT,
    JAVA,
    PYTHON,

    // 프레임워크
    EXPRESS,
    NESTJS,
    SPRING_BOOT,
    DJANGO,
    FLASK,
    FASTAPI,

    // 데이터베이스
    MYSQL,
    MARIADB,
    POSTGRESQL,
    MONGODB,
    REDIS,
    ELASTICSEARCH,

    // ORM
    TYPEORM,
    PRISMA,
    SEQUELIZE,
    JPA,
    HIBERNATE,

    // API
    GRAPHQL,
    REST,
    GRPC,
    WEBSOCKET,

    // 메시지 큐
    KAFKA,
    RABBITMQ,

    // 인증
    JWT,
    OAUTH,

    // 테스팅
    JUNIT,
    JEST
}
