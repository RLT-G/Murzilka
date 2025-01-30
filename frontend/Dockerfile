FROM node:22.1.0-slim

RUN apt-get update && apt-get install -y build-essential && rm -rf /var/lib/apt/lists/*

WORKDIR /app

ENV PATH=/app/node_modules/.bin:$PATH
ENV PORT=3000
ENV NODE_ENV=production
ENV REACT_APP_API_URL=https://myr3ulka.online/api

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
COPY .yarnrc.yml /app/.yarnrc.yml
RUN yarn cache clean --force
RUN corepack enable
RUN yarn set version 4.2.2
RUN yarn install --immutable

COPY . /app
RUN yarn run build

# start app
CMD ["yarn", "run", "start"]
