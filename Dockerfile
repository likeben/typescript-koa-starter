FROM node:carbon

WORKDIR /usr/app

COPY package*.json .npmrc ./

RUN npm install

COPY . .

EXPOSE 6666

CMD [ "npm", "run", "dev" ]