FROM node:20

WORKDIR /app

RUN apt-get update && apt-get install -y curl \
    && curl -L https://github.com/a8m/envsubst/releases/download/v1.4.2/envsubst-`uname -s`-`uname -m` -o envsubst \
    && chmod +x envsubst \
    && mv envsubst /usr/local/bin \
    && apt-get remove -y curl \
    && apt-get autoremove -y \
    && rm -rf /var/lib/apt/lists/*

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build

EXPOSE 8080

CMD ["/bin/bash", "-c", "envsubst < config/config.template.yaml > config/config.yaml && yarn start:prod"]
