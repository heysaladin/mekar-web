#! /usr/bin/env sh

docker run -it \
  --expose=9090 \
  -p 9090:9090 \
  pinjam-main-web \
  npm start
