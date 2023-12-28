
# FROM ubuntu:latest


# RUN apt-get update && \
#     apt-get install -y curl && \
#     curl -sL https://deb.nodesource.com/setup_18.x | bash - && \
#     apt-get install -y nodejs 


# RUN apt-get install -y libgbm-dev gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget

# RUN useradd -d /programmable-matter programmable-matter
# USER programmable-matter

# WORKDIR /app
# COPY . .


# USER root
# RUN chown -R node /app
# RUN chown root /app/node_modules/electron/dist/chrome-sandbox
# RUN chmod 4755 /app/node_modules/electron/dist/chrome-sandbox
# # RUN npm install -g npm@9.8.0 && npm install

# EXPOSE 5555

# USER programmable-matter
# CMD  npm start 


# use the version that corresponds to your electron version
FROM node:18.16.0

# install electron dependencies or more if your library has other dependencies
RUN apt-get update && apt-get install \
    git libx11-xcb1 libxcb-dri3-0 libxtst6 libnss3 libatk-bridge2.0-0 libgtk-3-0 libxss1 libasound2 \
    -yq --no-install-suggests --no-install-recommends \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN apt-get update && \
    apt-get install -y curl && \
    apt-get install -y xvfb libgbm-dev gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget

RUN npm install -g electron@10.1.5
# copy the source into /app
WORKDIR /app
COPY . .
RUN chown -R node /app

# install node modules and perform an electron rebuild
USER node
RUN npm install
# RUN npx electron-rebuild
ENV DISPLAY=:44
#44
ENV DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host/run/dbus/system_bus_socket
ENV SCHAT_URL=http://125.212.227.37:4000
ENV SCHAT_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTMsImFwcF9pZCI6MTIxMjE4MDQxODA4MDAzNCwibmFtZSI6ImRldl9vcmVzIiwiY3JlYXRlZF9hdCI6IjIwMjMtMTEtMDNUMDk6MTg6MzEuNDExWiIsImlhdCI6MTY5OTAwMzExMX0.DMffFz9YSlCDmmjclBzz08kcYFnj7Psj6XtI3OeJKbw
# Electron needs root for sand boxing
# see https://github.com/electron/electron/issues/17972
USER root
RUN chown root /app/node_modules/electron/dist/chrome-sandbox
RUN chmod 4755 /app/node_modules/electron/dist/chrome-sandbox

# Electron doesn't like to run as root
USER node
CMD bash

# "Địa chỉ máy local :http://172.16.70.39:4000 "
# "Gõ `ip addr show` tìm đến mạng wlp2s0/ inet 172.16.70.39/26 brd 172.16.70.63 scope global dynamic noprefixroute wlp2s0"
# "Build Image Docker: docker build -t agent:latest -f docker.Dockerfile ."
# "Chạy docker với mạng host: docker run --privileged --network host -v /var/run/dbus/system_bus_socket:/vr/run/dbus/system_bus_socket -v /home/owsvietnam/TuanProject/electron_docker:/home/node/.config/Electron -e DISPLAY=unix$DISPLAY -v`pwd`/src:/app/src --rm -it agent"
# "Chạy electron trong docker: xvfb-run --server-num 44 electron dist/src/app.js"
