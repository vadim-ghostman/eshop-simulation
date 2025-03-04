FROM node:23-alpine

WORKDIR /app
COPY package.json /app
RUN yarn

COPY . /app

CMD ["yarn", "dev"]