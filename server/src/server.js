const fs = require("fs");
const path = require("path");
const express = require("express");
const redirect = require("./redirect");
const serveSpa = require("./serve-spa");

const port = process.env.PORT || 3000;

if (!process.env.HASURA_ENDPOINT) {
  throw new Error(`HASURA_ENDPOINT is not set`);
}

const getOutgoingFromIncomingQuery = fs
  .readFileSync(path.join(__dirname, "getOutgoingFromIncoming.graphql"))
  .toString();

const app = express();

app.use(
  "/link",
  redirect({
    hasura: {
      endpoint: process.env.HASURA_ENDPOINT,
      query: getOutgoingFromIncomingQuery,
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
