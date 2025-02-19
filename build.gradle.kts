plugins {
    java
    id("org.springframework.boot") version "3.3.5"
    id("io.spring.dependency-management") version "1.1.6"
}

group = "com.github.kmu_wink"
version = "2.0"

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(17)
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

    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.boot:spring-boot-starter-data-mongodb")
    implementation("org.springframework.boot:spring-boot-starter-data-redis")
    implementation("org.springframework.boot:spring-boot-starter-validation")
    implementation("org.springframework.boot:spring-boot-starter-mail")
    implementation("org.springframework.boot:spring-boot-starter-actuator")
    developmentOnly("org.springframework.boot:spring-boot-devtools")

    implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:2.6.0")
    implementation("io.micrometer:micrometer-registry-prometheus")

    implementation("com.auth0:java-jwt:4.4.0")

    implementation("io.awspring.cloud:spring-cloud-starter-aws:2.4.4")
    implementation("javax.xml.bind:jaxb-api:2.3.1")

    implementation("com.google.apis:google-api-services-drive:v3-rev20241206-2.0.0")
    implementation("com.google.apis:google-api-services-forms:v1-rev20241112-2.0.0")

    implementation("com.konghq:unirest-java-core:4.4.5")
    implementation("com.konghq:unirest-objectmapper-jackson:4.2.9")
    implementation("org.jsoup:jsoup:1.18.3")

    implementation("com.github.atomfrede:jadenticon:3.0.4")
    implementation("org.apache.xmlgraphics:batik-transcoder:1.18")
}