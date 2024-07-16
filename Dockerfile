# Build Stage
FROM node:20 as build-stage

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build

# Run Stage
FROM node:20

WORKDIR /app

RUN apt-get update && apt-get install -y curl \
    && curl -L https://github.com/a8m/envsubst/releases/download/v1.4.2/envsubst-`uname -s`-`uname -m` -o envsubst \
    && chmod +x envsubst \
    && mv envsubst /usr/local/bin \
    && apt-get remove -y curl \
    && apt-get autoremove -y \
    && rm -rf /var/lib/apt/lists/*

COPY --from=build-stage /app/node_modules ./node_modules
COPY --from=build-stage /app/package.json /app/yarn.lock /app/dist ./

RUN rm -f ./config/config.yaml \
    && envsubst < ./config/config.template.yaml > ./config/config.yaml

EXPOSE 8080

CMD ["node", "main"]
