const trycatch = require("./trycatch");
const fetch = require("node-fetch");

module.exports = async ({
  hasura: { endpoint, adminSecret, query },
  incoming,
  outgoing,
  userAgentObj,
}) => {
  const userAgent = userAgentObj.ua;
  const browser = userAgentObj.browser.name;
  const deviceType =
    userAgentObj.device.type === undefined ? "Desktop" : userAgent.device.type;
  const [response, fetchError] = await trycatch(
    fetch(endpoint, {
      method: "POST",
      headers: {
        "x-hasura-admin-secret": adminSecret,
      },
      body: JSON.stringify({
        query,
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
    const [{ data, errors }, jsonError] = await trycatch(response.json());
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
    } else if (
      !data ||
      !data.insert_hits ||
      !data.insert_hits.returning ||
      data.insert_hits.returning.length < 1
    ) {
      console.error(
        `ERROR '${incoming}' inconsistent graphql response when storing hit`
      );
    } else if (
      !data.insert_hits.returning[0] ||
      !data.insert_hits.returning[0].incoming_link ||
      !data.insert_hits.returning[0].outgoing_link ||
      !data.insert_hits.returning[0].user_agent ||
      !data.insert_hits.returning[0].device_type ||
      !data.insert_hits.returning[0].browser
    ) {
      console.error(
        `ERROR '${incoming}' inconsistent graphql response when storing hit`
      );
    } else {
      console.log(`INFO stored hit from '${incoming}' to '${outgoing}'`);
    }
  }
};
