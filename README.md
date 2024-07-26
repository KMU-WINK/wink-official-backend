# Wink Official Backend

![Logo](https://avatars.githubusercontent.com/u/69004745?s=300)

## Tech Stack

**Runtime:**
- ![nodejs](https://img.shields.io/badge/node.js-5FA04E?style=for-the-badge&logo=node.js&logoColor=white)
- ![typescript](https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

**Server:**
- ![nestjs](https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)

**Database:**
- ![mongodb](https://img.shields.io/badge/MongoDB-13aa52?style=for-the-badge&logo=mongodb&logoColor=white)
- ![redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)

**Convention:**
- ![eslint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
- ![prettier](https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white)
- ![husky](https://img.shields.io/badge/husky-5D4F85?style=for-the-badge&logoColor=white)

**CI/CD:**
- ![github actions](https://img.shields.io/badge/github%20actions-2088FF?style=for-the-badge&logo=github%20actions&logoColor=white)
## Related
[Wink Official Frontend](https://github.com/kmu-wink/wink-official-frontend)


## Documentation

[API Server (develop)](http://43.202.208.79/)
[API Documentation (develop)](http://43.202.208.79/swagger)


## Run Locally

Clone the project

```bash
git clone https://github.com/kmu-wink/wink-official-backend
```

Go to the project directory

```bash
cd wink-official-backend
```

Install dependencies

```bash
yarn install
```

Copy the config file

```bash
cp config/config.template.yaml config/config.yaml
```

Edit the config file

```bash
vim config/config.yaml
```

Start the server

```bash
yarn start
```

## Run Locally with Docker

Build the Docker image or pull the Docker image from Docker Hub

```bash
docker build -t wink-backend .
```

```bash
docker pull ioloolo/wink-official-backend:latest
```

Run the Docker container

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

## Running Tests

To run tests, run the following command

```bash
  yarn test
```


## Authors

- [@ukly](https://www.github.com/ukly)
- [@U-Geon](https://www.github.com/U-Geon)
- [@son-daehyeon](https://www.github.com/son-daehyeon)

