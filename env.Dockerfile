FROM docker:19.03.8

RUN apk update && apk add --no-cache curl jq

# build
# docker login repo.devpack.cc
# docker build -t repo.devpack.cc/eco_ssot_2021/front_end .
# docker push repo.devpack.cc/eco_ssot_2021/front_end
