FROM container-registry.oracle.com/graalvm/jdk:21

WORKDIR /app

COPY build/libs/backend.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
