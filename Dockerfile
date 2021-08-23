# Multi-stage
# 1) Node image for building frontend assets
# 2) nginx stage to serve frontend assets

# Name the node stage "builder"
FROM node:12 AS builder

ARG STAGE
# Set working directory
WORKDIR /app
# Copy all files from current directory to working dir in image
COPY . .
# install node modules and build assets

RUN yarn install && yarn build:${STAGE}

# nginx state for serving content
FROM nginx:alpine
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /app/build .
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]

# build & run service
# docker build --build-arg stage=stage -t eco-ssot-frontend:0.0.0-stage .
# docker tag eco-ssot-frontend harbor.wistron.com/k8sprdwhqecossot2021/eco-ssot-frontend
# docker push harbor.wistron.com/k8sprdwhqecossot2021/eco-ssot-frontend
# docker run --rm -it -p 8080:80 eco-ssot-frontend
