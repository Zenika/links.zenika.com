const fs = require("fs");
const path = require("path");
const express = require("express");
const redirectUsingForwardedHost = require("./redirectUsingForwardedHost");
const redirect = require("./redirect");
const serveSpa = require("./serve-spa");
const helmet = require("helmet");
const redirectSsl = require("redirect-ssl");

const port = process.env.PORT || 3000;

if (!process.env.HASURA_GRAPHQL_ENDPOINT) {
  throw new Error(`HASURA_GRAPHQL_ENDPOINT is not set`);
}
if (!process.env.HASURA_ADMIN_SECRET) {
  throw new Error(`HASURA_ADMIN_SECRET is not set`);
}

const getOutgoingFromIncomingQuery = fs
  .readFileSync(path.join(__dirname, "getOutgoingFromIncoming.graphql"))
  .toString();

const postHitOnRedirect = fs
  .readFileSync(path.join(__dirname, "postHitOnRedirect.graphql"))
  .toString();

const app = express();

app.use(redirectSsl);

app.use(helmet());

app.use(
  "/",
  redirectUsingForwardedHost({
    mapping: JSON.parse(process.env.FORWARDED_HOST_MAPPING || "{}"),
  })
);

app.use(
  "/link",
  redirect({
    hasura: {
      endpoint: process.env.HASURA_GRAPHQL_ENDPOINT,
      adminSecret: process.env.HASURA_ADMIN_SECRET,
      queryRedirect: getOutgoingFromIncomingQuery,
      queryStoreHit: postHitOnRedirect,
    },
  })
);

if (process.env.SERVE_SPA) {
  app.use(serveSpa(path.resolve(process.env.SERVE_SPA)));
}

module.exports = app;

app.listen(port, () => {
  console.log("INFO ready");
});
