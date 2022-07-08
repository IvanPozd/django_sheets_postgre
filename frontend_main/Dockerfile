FROM node:17-alpine AS development

ENV NODE_ENV development

WORKDIR /frontend_main

COPY package.json .

COPY yarn.lock .

RUN yarn install

RUN npm install react-bootstrap bootstrap

RUN npm install --save react-router-dom@5.2.0

COPY . .

EXPOSE 3000

CMD ["yarn", "start" ]