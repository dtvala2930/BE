FROM node:22

WORKDIR /app

COPY . .

RUN yarn install

EXPOSE 5000

#yarn run start:dev
CMD ["yarn", "run", "start:dev"]






