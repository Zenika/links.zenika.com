const fetch = require("node-fetch");
const trycatch = require("./trycatch");
const express = require("express");
const uaParser = require("ua-parser-js");
const storeHit = require("./storeHit");

module.exports = ({
  hasura: { endpoint, adminSecret, queryRedirect, queryStoreHit },
}) =>
  express.Router().get(/.*/, async (req, res) => {
    const incoming = req.url;
    const userAgentObj = uaParser(req.headers["user-agent"]);
    console.log(`INFO '${incoming}'`);
    const [response, fetchError] = await trycatch(
      fetch(endpoint, {
        method: "POST",
        headers: {
          "x-hasura-admin-secret": adminSecret,
        },
        body: JSON.stringify({
          query: queryRedirect,
          variables: {
            incoming,
          },
        }),
      })
    );
    if (fetchError) {
      console.error(`ERROR '${incoming}' fetch error`, fetchError);
      res.sendStatus(500);
    } else if (!response.ok) {
      console.error(
        `ERROR '${incoming}' hasura responded with status code ${response.status}`
      );
      res.sendStatus(500);
    } else {
      const [{ data, errors }, jsonError] = await trycatch(response.json());
      if (jsonError) {
        console.error(`ERROR '${incoming}' json parse error`, jsonError);
        res.sendStatus(500);
      } else if (errors) {
        console.error(
          `ERROR '${incoming}' graphql errors: ${JSON.stringify(errors)}`
        );
        res.sendStatus(500);
      } else if (!data || !data.links) {
        console.error(`ERROR '${incoming}' inconsistent graphql response`);
        res.sendStatus(500);
      } else if (data.links.length < 1) {
        console.info("INFO not found");
        res.sendStatus(404);
      } else if (!data.links[0] || !data.links[0].outgoing) {
        console.error(`ERROR '${incoming}' inconsistent graphql response`);
        res.sendStatus(500);
      } else {
        const outgoing = data.links[0].outgoing;
        console.info(`INFO found '${outgoing}'`);
        storeHit({
          hasura: {
            endpoint: endpoint,
            adminSecret: adminSecret,
            queryStoreHit,
          },
          incoming,
          outgoing,
          userAgentObj,
        });
        res.redirect(outgoing);
      }
    }
  });
