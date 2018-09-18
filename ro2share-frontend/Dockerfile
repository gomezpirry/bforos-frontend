FROM node:boron
MAINTAINER Federico Lopez Gomez "fico89@gmail.com"
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 4200
CMD [ "npm", "start" ]
