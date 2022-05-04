
FROM node:14
WORKDIR /app

deps:
    COPY package.json package-lock.json ./
    RUN npm i -g npm@8
    RUN npm ci
    SAVE ARTIFACT package-lock.json AS LOCAL ./package-lock.json

build:
    FROM +deps
    COPY tsconfig.json sst.json ./
    COPY src src
    COPY stacks stacks
    RUN npm run build

test:
    FROM +deps
    COPY tsconfig.json sst.json ./
    COPY .eslintrc.js jest.config.js ./
    COPY src src
    COPY stacks stacks
    COPY tests tests
    RUN npm run lint
    RUN npm run test
    SAVE ARTIFACT coverage /coverage AS LOCAL coverage
