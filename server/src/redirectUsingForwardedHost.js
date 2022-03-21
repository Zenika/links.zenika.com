const express = require("express");

module.exports = ({ mapping }) =>
  express.Router().get(/.*/, async (req, res, next) => {
    const forwardedHost =
      req.headers["x-forwarded-host"] || req.headers["host"];
    if (
      forwardedHost === "links.zenika.com" ||
      forwardedHost?.startsWith("localhost")
    ) {
      next();
      return;
    }
    if (!forwardedHost || !mapping[forwardedHost]) {
      res.sendStatus(404);
    } else {
      const baseLocation =
        typeof mapping[forwardedHost] === "string"
          ? mapping[forwardedHost]
          : mapping[forwardedHost].location;
      const path = mapping[forwardedHost].forwardPath
        ? new URL(req.url, baseLocation).pathname
        : "";
      const location = baseLocation + path;
      console.log(
        `INFO redirect forwarded host '${forwardedHost}' to '${location}'`
      );
      res.redirect(location);
    }
  });
