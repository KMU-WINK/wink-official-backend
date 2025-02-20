FROM azul/zulu-openjdk:17-jre-latest

WORKDIR /app

COPY build/libs/backend.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
