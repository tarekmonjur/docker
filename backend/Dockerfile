FROM node:alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


FROM builder as dev

EXPOSE 4000
CMD [ "npm", "run", "start-dev" ]


FROM builder as prod

EXPOSE 4000
CMD [ "npm", "run", "start" ]


