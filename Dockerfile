FROM node:12 as frontend-build
ARG HASURA_ENDPOINT
ENV HASURA_ENDPOINT $HASURA_ENDPOINT

WORKDIR /app

COPY web/package.json web/package-lock.json ./
RUN npm ci

COPY web/src src
RUN npm run build

# ---

FROM node:12
ARG SERVE_SPA=public
ENV SERVE_SPA $SERVE_SPA

WORKDIR /app

COPY server/package.json server/package-lock.json ./
RUN npm ci

COPY server/src src

COPY --from=frontend-build /app/dist $SERVE_SPA

CMD ["npm", "start"]
