#!/bin/sh

################################
# node v20.7.0が必要
# https://nodejs.org/api/single-executable-applications.html#single-executable-applications
################################

cd `dirname $0`

# jsをbuild
npm run build-js

# バイナリ実行可能な形式に変換
mkdir -p bin
node --experimental-sea-config sea-config.json
cp $(command -v node) ./bin/jobcan-manipulator
codesign --remove-signature ./bin/jobcan-manipulator

npx postject bin/jobcan-manipulator NODE_SEA_BLOB jobcan-manipulator.blob \
    --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2 \
    --macho-segment-name NODE_SEA
codesign --sign - bin/jobcan-manipulator

# 不要なファイルの削除
rm -r dist
rm jobcan-manipulator.blob
