#! /usr/bin/env sh

PROJECTNAME="pinjam-main-web"

PROJECTDIR=$(dirname $(dirname $(readlink -f "$0")))

docker build \
  --build-arg user=$USER \
  --build-arg uid=$(id -u $USER) \
  -f $PROJECTDIR/Dockerfile \
  -t $PROJECTNAME $PROJECTDIR
