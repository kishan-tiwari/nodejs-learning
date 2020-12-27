FROM node:8-alpine
WORKDIR /usr/share/app
COPY package.json  .
RUN npm install
COPY app.js .
EXPOSE 4444
ENTRYPOINT [ "npm", "start" ]