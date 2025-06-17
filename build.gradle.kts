plugins {
    java
    id("org.springframework.boot") version "3.5.0"
    id("io.spring.dependency-management") version "1.1.7"
    id("io.sentry.jvm.gradle") version "5.7.0"
}

group = "com.github.kmu_wink"

java {
    toolchain {
        languageVersion.set(JavaLanguageVersion.of(21))
    }
}

configurations {
    compileOnly {
        extendsFrom(configurations.annotationProcessor.get())
    }
}

repositories {
    mavenCentral()
    maven { url = uri("https://jitpack.io") }
}

dependencies {
    compileOnly("org.projectlombok:lombok")
    annotationProcessor("org.projectlombok:lombok")

    implementation("org.springframework.boot:spring-boot-starter-web") {
        exclude(module = "spring-boot-starter-tomcat")
    }
    implementation("org.springframework.boot:spring-boot-starter-undertow")
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.boot:spring-boot-starter-data-mongodb")
    implementation("org.springframework.boot:spring-boot-starter-data-redis")
    implementation("org.springframework.boot:spring-boot-starter-validation")
    implementation("org.springframework.boot:spring-boot-starter-mail")
    developmentOnly("org.springframework.boot:spring-boot-devtools")

    implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:2.8.9")

    implementation("com.auth0:java-jwt:4.5.0")

    implementation("io.awspring.cloud:spring-cloud-starter-aws:2.4.4")
    implementation("javax.xml.bind:jaxb-api:2.3.1")

    implementation("com.konghq:unirest-java-core:4.4.7")
    implementation("com.konghq:unirest-objectmapper-jackson:4.2.9")
    implementation("org.jsoup:jsoup:1.20.1")

    implementation("com.github.atomfrede:jadenticon:3.0.4")
    implementation("org.apache.xmlgraphics:batik-transcoder:1.19")
}

sentry {
    includeSourceContext = true

    org = System.getenv("SENTRY_ORG")
    projectName = System.getenv("SENTRY_PROJECT")
    authToken = System.getenv("SENTRY_AUTH_TOKEN")
}