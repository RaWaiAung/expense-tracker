FROM node:22-alpine As development

WORKDIR /usr/src/app

COPY ./backend/package.json ./

COPY ./backend/package-lock.json ./

COPY ./backend/src ./src

COPY ./backend/libs ./libs

COPY ./backend/tsconfig.build.json ./tsconfig.build.json

COPY ./backend/tsconfig.json ./tsconfig.json

COPY ./backend/nest-cli.json ./nest-cli.json

RUN yarn install

RUN yarn build


FROM node:22-alpine

WORKDIR /usr/src/app

COPY ./backend/package*.json ./

ENV PORT=4000

ENV NODE_ENV=production

RUN yarn install --production

COPY --from=development /usr/src/app/dist ./dist

EXPOSE ${PORT}

CMD [  "node", "dist/main" ]
