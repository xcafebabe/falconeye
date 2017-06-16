FROM nodered/node-red-docker

USER root
RUN mkdir /workspace
WORKDIR /workspace
COPY package.json /workspace
RUN npm install gulp-cli -g && npm install
COPY . /workspace
RUN gulp build && npm link
WORKDIR /usr/src/node-red
ENTRYPOINT ["/workspace/docker-entrypoint.sh"]

EXPOSE 1880
