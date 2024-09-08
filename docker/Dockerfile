# docker buildx build -f docker/Dockerfile -t interntrack:v0.1 .
# docker run -itd --restart=always -e ARANGO_ROOT_PASSWORD=test123 -p 8529:8529 -p 3000:3000 interntrack:v0.1

# aliyun & volc
# cd /app && export ARANGO_ROOT_PASSWORD=PJlab@2024
# ARANGODB_DEFAULT_ROOT_PASSWORD="$ARANGO_ROOT_PASSWORD" nohup arangod --config /etc/arangodb3/arangod.conf --server.endpoint tcp://127.0.0.1:8529 --server.authentication true --log.file /tmp/init-log --log.foreground-tty false &
# arangosh --server.endpoint=tcp://127.0.0.1:8529 --server.authentication true --server.password=$ARANGO_ROOT_PASSWORD --javascript.execute-string "db._createDatabase(\"interntrack\");"
# nohup pnpm dev &

# frpc https://github.com/fatedier/frp/blob/dev/dockerfiles/Dockerfile-for-frpc
FROM golang:1.22 AS building

RUN cd / && git clone https://github.com/fatedier/frp.git building
WORKDIR /building
RUN make frpc

# node:22-bookworm https://github.com/nodejs/docker-node/blob/0c0069246367ac5ac0fc6bca141fb04faaca2f4b/22/bookworm/Dockerfile
FROM node:22-bookworm AS base

COPY --from=building /building/bin/frpc /usr/bin/frpc

# arangodb:3.12.2 https://github.com/arangodb/arangodb-docker/blob/ba430694881c65dc95aaf47e0250e501ead0f5b5/alpine/3.12.2/Dockerfile
ENV ARANGO_VERSION 3.12.2

# see
#   https://docs.arangodb.com/3.12/components/arangodb-server/options/#--serverendpoint
#   https://docs.arangodb.com/3.12/components/arangodb-server/options/#log

RUN apt-get update && apt-get install -y vim ssh gnupg pwgen binutils numactl libnuma-dev && \
    gpg --batch --keyserver keys.openpgp.org --recv-keys 8003EDF6F05459984878D4A6C04AD0FD86FEC04D && \
    mkdir /docker-entrypoint-initdb.d      && \
    cd /tmp                                && \
    arch="$(dpkg --print-architecture)"    && \
    export arch="$(dpkg --print-architecture)"    && \
    case "$arch" in                           \
        amd64)   export dpkgArch='amd64'          ;; \
        arm64)   export dpkgArch='arm64'          ;; \
        *) echo >&2 "unsupported: $arch" && exit 1 ;; \
    esac                                   && \
    export ARANGO_URL="https://download.arangodb.com/arangodb312/DEBIAN/${dpkgArch}" && \
    export ARANGO_PACKAGE="arangodb3_${ARANGO_VERSION}-1_${dpkgArch}.deb" && \
    export ARANGO_PACKAGE_URL="${ARANGO_URL}/${ARANGO_PACKAGE}" && \
    export ARANGO_SIGNATURE_URL="${ARANGO_PACKAGE_URL}.asc" && \
    wget ${ARANGO_SIGNATURE_URL}           && \
    wget ${ARANGO_PACKAGE_URL}             && \
    gpg --verify ${ARANGO_PACKAGE}.asc     && \
    ar x ${ARANGO_PACKAGE} data.tar.gz     && \
    tar -C / -x -z -f data.tar.gz --skip-old-files && \
    sed -ri \
        -e 's!127\.0\.0\.1!0.0.0.0!g' \
        -e 's!^(file\s*=\s*).*!\1 -!' \
        -e 's!^\s*uid\s*=.*!!' \
        /etc/arangodb3/arangod.conf        && \
    chgrp -R 0 /var/lib/arangodb3 /var/lib/arangodb3-apps && \
    chmod -R 775 /var/lib/arangodb3 /var/lib/arangodb3-apps && \
    rm -f ${ARANGO_PACKAGE}* data.tar.gz && \
    apt-get remove --purge -y gnupg && apt-get autoremove -y && apt-get clean
# Note that Openshift runs containers by default with a random UID and GID 0.
# We need that the database and apps directory are writable for this config.

ENV GLIBCXX_FORCE_NEW=1

# Adjust TZ by default since tzdata package isn't present (BTS-913)
RUN echo "UTC" > /etc/timezone

# InternTrack
WORKDIR /app

COPY . /app

RUN npm install -g pnpm && pnpm i

# retain the database directory and the Foxx Application directory(ArangoDB)
VOLUME ["/var/lib/arangodb3", "/var/lib/arangodb3-apps"]

COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

# standard port
EXPOSE 3000 8529
CMD ["interntrack"]