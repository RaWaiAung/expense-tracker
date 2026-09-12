FROM node:22-alpine As development

WORKDIR /usr/src/app

COPY package.json ./

COPY package-lock.json ./

COPY libs ./libs

COPY tsconfig.build.json ./tsconfig.build.json

COPY tsconfig.json ./tsconfig.json

COPY nest-cli.json ./nest-cli.json

RUN npm install

COPY src ./src

RUN npm run build


FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./

ENV PORT=4000

ENV NODE_ENV=production

RUN npm install --production

COPY --from=development /usr/src/app/dist ./dist

EXPOSE ${PORT}

CMD [  "node", "dist/main" ]
