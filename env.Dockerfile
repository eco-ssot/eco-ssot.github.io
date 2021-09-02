FROM node:12-slim

RUN \
  apt-get update && \
  apt-get install zip curl jq yarn -yq

# build
# docker login repo.devpack.cc
# docker build -t repo.devpack.cc/ssot/eco-ssot-frontend .
# docker push repo.devpack.cc/ssot/eco-ssot-frontend
