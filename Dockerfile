# Build
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

# Runtime
FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache curl \
    && curl -L https://github.com/a8m/envsubst/releases/latest/download/envsubst-$(uname -s)-$(uname -m) -o envsubst \
    && chmod +x envsubst \
    && mv envsubst /usr/local/bin/envsubst \
    && apk del curl

COPY --from=build /app/config/config.template.yaml ./config/config.template.yaml

COPY --from=build /app/package.json /app/yarn.lock ./
RUN yarn install --production --frozen-lockfile

COPY --from=build /app/dist ./dist

EXPOSE 8080

CMD ["/bin/sh", "-c", "envsubst < config/config.template.yaml > config/config.yaml && yarn start:prod"]
