#!/bin/bash

cd /workspace && gulp build
cd /usr/src/node-red && npm link jobsify && \
npm start -- --userDir /data
echo "Have fun!"