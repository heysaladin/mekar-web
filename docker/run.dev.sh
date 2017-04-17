#! /usr/bin/env sh

PROJECTDIR=$(dirname $(dirname $(readlink -f "$0")))

docker run -it \
  -u $USER \
  -v $PROJECTDIR:/project \
  -v /project/node_modules \
  --expose=4000 --expose=4001 \
  -p 4000:4000 -p 4001:4001 \
  pinjam-main-web \
  npm run dev
