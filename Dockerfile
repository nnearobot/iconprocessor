FROM node:20

RUN mkdir /usr/src/thumbnails
WORKDIR /usr/src/thumbnails

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "start"]
