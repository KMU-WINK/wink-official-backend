FROM azul/zulu-openjdk:17-jre-latest

WORKDIR /app

COPY build/libs/wink-official-backend-2.0.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
