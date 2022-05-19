# Multi-stage
# 1) Node image for building frontend assets
# 2) nginx stage to serve frontend assets

# Name the node stage "builder"
FROM node:14 AS builder

ARG STAGE
# Set working directory
WORKDIR /app
# Copy all files from current directory to working dir in image
COPY . .

# Remove mock files
RUN rm -rf /app/src/__mocks__
RUN rm -rf /app/src/__tests__
RUN rm /app/src/serviceWorker.js
RUN rm /app/src/setupTests.js

# install node modules and build assets
RUN yarn install --network-timeout 1000000 && yarn build:${STAGE} && yarn cache clean

# nginx state for serving content
FROM nginx:alpine

RUN apk update && apk add bash jq

# replace config env
ENV CONFIG_FILE=/usr/share/nginx/html/env.json
ENV TEMP_CONFIG_FILE=/usr/share/nginx/html/env.tmp.json
COPY ./start-nginx.sh /usr/bin/start-nginx.sh
RUN chmod +x /usr/bin/start-nginx.sh

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /app/build .
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf
# Containers run nginx with global directives and daemon off

ENTRYPOINT [ "start-nginx.sh" ]
# ENTRYPOINT ["nginx", "-g", "daemon off;"]

# build & run service
# docker build --build-arg STAGE=stage -t harbor.wistron.com/k8sprdwhqecossot2021/eco-ssot-frontend:0.0.0-stage .
# docker push harbor.wistron.com/k8sprdwhqecossot2021/eco-ssot-frontend:0.0.0-stage
# docker run --rm -it -p 8080:80 eco-ssot-frontend
