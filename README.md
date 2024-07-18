# Wink Official Backend

## 로컬 실행 방법

### 1. 환경 설정
`config/config.template.yaml` 파일을 `config/config.yaml`로 복사한 후, `config/config.yaml`을 수정해주세요.
```bash
cp config/config.template.yaml config/config.yaml
```

* config.template.yaml
```yaml
redis:
  host: ${REDIS_HOST:=redis}
  port: ${REDIS_PORT:=6379}

mongo:
  host: ${MONGO_HOST:=mongo}
  port: ${MONGO_PORT:=27017}
  username: ${MONGO_USERNAME:=''}
  password: ${MONGO_PASSWORD:=''}
  authSource: ${MONGO_AUTH_SOURCE:=''}
  database: ${MONGO_DATABASE:=test}

smtp:
  host: ${SMTP_HOST:=smtp.gmail.com}
  port: ${SMTP_PORT:=465}
  secure: ${SMTP_SECURE:=true}
  username: ${SMTP_USERNAME:=''}
  password: ${SMTP_PASSWORD:=''}

jwt:
  secret: ${JWT_SECRET:=secret}
  expiresIn: ${JWT_EXPIRES_IN:=14d}


```

### 2. 의존성 설치
```bash
yarn install
```

### 3. 빌드
```bash
yarn build
```

### 4. 애플리케이션 실행
```bash
yarn start:prod
```

## 도커 컨테이너 생성 및 실행

### 1. 도커 이미지 빌드
```bash
docker build -t wink-backend .
```

### 2. 도커 컨테이너 실행
```bash
docker run --name wink-backend \
           -e REDIS_HOST=(REDIS_HOST) -e REDIS_PORT=(REDIS_PORT) \
           -e MONGO_HOST=(MONGO_HOST) -e MONGO_PORT=(MONGO_PORT) \
           -e MONGO_USERNAME=(MONGO_USERNAME) -e MONGO_PASSWORD=(MONGO_PASSWORD) \
           -e MONGO_AUTH_SOURCE=(MONGO_AUTH_SOURCE) -e MONGO_DATABASE=(MONGO_DATABASE) \
           -e SMTP_HOST=(SMTP_HOST) -e SMTP_PORT=(SMTP_PORT) \
           -e SMTP_USERNAME=(SMTP_USER) -e SMTP_PASSWORD=(SMTP_PASS) \
           -e SMTP_SECURE=(SMTP_SECURE) -e \
           -e JWT_SECRET=(JWT_SECRET) -e JWT_EXPIRES_IN=(JWT_EXPIRES_IN) \
           -p 8080:8080 \
           -v /path/to/logs:/app/logs \
           -d wink-backend
```

만약 Redis 및 Mongo가 Docker Container로 실행되고 있다면 아래 명령어로 실행할 수 있습니다.
```bash
# Redis 및 Mongo의 Container 이름이 각각 redis, mongo라고 가정한다.
docker run --name wink-backend \
           --link redis --link mongo \
           -e REDIS_HOST=redis -e REDIS_PORT=6379 \
           -e MONGO_HOST=mongo -e MONGO_PORT=27017 \
           -e MONGO_DATABASE=wink \
           -e SMTP_HOST=(SMTP_HOST) -e SMTP_PORT=(SMTP_PORT) \
           -e SMTP_USERNAME=(SMTP_USER) -e SMTP_PASSWORD=(SMTP_PASS) \
           -e SMTP_SECURE=(SMTP_SECURE) -e \
           -e JWT_SECRET=(JWT_SECRET) -e JWT_EXPIRES_IN=(JWT_EXPIRES_IN) \
           -p 8080:8080 \
           -v /path/to/logs:/app/logs \
           -d wink-backend
```
