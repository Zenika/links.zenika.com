const trycatch = require("./trycatch");
const fetch = require("node-fetch");

module.exports = async ({
  hasura: { endpoint, adminSecret, queryStoreHit },
  incoming,
  outgoing,
  userAgentObj,
}) => {
  const userAgent = userAgentObj.ua;
  const browser = userAgentObj.browser.name;
  const deviceType = userAgentObj.device.type || "desktop";
  const [response, fetchError] = await trycatch(
    fetch(endpoint, {
      method: "POST",
      headers: {
        "x-hasura-admin-secret": adminSecret,
      },
      body: JSON.stringify({
        query: queryStoreHit,
        variables: {
          incoming,
          outgoing,
          userAgent,
          deviceType,
          browser,
        },
      }),
    })
  );
  if (fetchError) {
    console.error(
      `ERROR '${incoming}' fetch error when storing hit`,
      fetchError
    );
  } else if (!response.ok) {
    console.error(
      `ERROR '${incoming}' hasura responded with status code ${response.status} when storring hit`
    );
  } else {
    const [{ errors }, jsonError] = await trycatch(response.json());
    if (jsonError) {
      console.error(
        `ERROR '${incoming}' json parse error when storing hit`,
        jsonError
      );
    } else if (errors) {
      console.error(
        `ERROR '${incoming}' graphql errors when storing hit: ${JSON.stringify(
          errors
        )}`
      );
    }
  }
};
