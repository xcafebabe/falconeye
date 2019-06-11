#!/bin/bash

cd /workspace && npm install && gulp build
cd /usr/src/node-red && npm link falconeye && \
npm start -- --userDir /data
echo "Have fun!"