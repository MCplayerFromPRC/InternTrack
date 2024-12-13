#!/bin/bash

# 阿里云和火山云的容器替换了原先镜像的Entrypoint，因此需要命令启动数据库，
# 该脚本启动了数据库和服务端

cd /app && export ARANGO_ROOT_PASSWORD=PJlab@2024
ARANGODB_DEFAULT_ROOT_PASSWORD="$ARANGO_ROOT_PASSWORD" nohup /usr/sbin/arangod --config /etc/arangodb3/arangod.conf --server.endpoint tcp://127.0.0.1:8529 --server.authentication true --log.file /tmp/init-log --log.foreground-tty false &
nohup pnpm dev &
