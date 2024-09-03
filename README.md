# Wink Official Backend

## Tech Stack

**Runtime:**
- ![nodejs](https://img.shields.io/badge/node.js-5FA04E?style=for-the-badge&logo=node.js&logoColor=white)
- ![typescript](https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

**Server:**
- ![nestjs](https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)

**Database:**
- ![mongodb](https://img.shields.io/badge/MongoDB-13aa52?style=for-the-badge&logo=mongodb&logoColor=white)
- ![redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)


## Swagger Documentation Path
- path: (BASE_URL)/api/swagger


## Related
[Wink Official Frontend](https://github.com/kmu-wink/wink-official-frontend)

[Wink Official Deploy](https://github.com/kmu-wink/wink-official-deploy)


## Live Server

[Live Server (Master)](https://wink.kookmin.ac.kr)

[Live Server (Develop)](https://wink-dev.kro.kr)


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

Build the Docker image 

```bash
docker build -t wink-official-backend:local .
```

Or pull the Docker image from Docker Hub

```bash
# master branch
docker pull kmuwink/wink-official-backend:master

# develop branch
docker pull kmuwink/wink-official-backend:develop
```

Run the Docker container

```bash
docker run \
          --name (CONTAINER_NAME) \
          
          -e REDIS_HOST=(REDIS_HOST) -e REDIS_PORT=(REDIS_PORT) \
          -e REDIS_PASSWORD=(REDIS_PASSWORD) \ 
          
          -e MONGO_HOST=(MONGO_HOST) -e MONGO_PORT=(MONGO_PORT) \
          -e MONGO_USERNAME=(MONGO_USERNAME) -e MONGO_PASSWORD=(MONGO_PASSWORD) \
          -e MONGO_AUTH_SOURCE=(MONGO_AUTH_SOURCE) -e MONGO_DATABASE=(MONGO_DATABASE) \
          
          -e SMTP_HOST=(SMTP_HOST) -e SMTP_PORT=(SMTP_PORT) \
          -e SMTP_USERNAME=(SMTP_USER) -e SMTP_PASSWORD=(SMTP_PASS) \
          -e SMTP_SECURE=(SMTP_SECURE) \
          
          -e S3_REGION=(S3_REGION) -e S3_BUCKET=(S3_BUCKET) \
          -e S3_ACCESS_KEY=(S3_ACCESS_KEY) -e S3_SECRET_KEY=(S3_SECRET_KEY) \
          
          -e JWT_SECRET=(JWT_SECRET) -e JWT_EXPIRES_IN=(JWT_EXPIRES_IN) \
          
          -p 8080:8080 -d (IMAGE_NAME)
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

