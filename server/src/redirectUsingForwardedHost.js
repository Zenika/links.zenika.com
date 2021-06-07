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
      console.log(
        `INFO redirect forwarded host '${forwardedHost}' to '${mapping[forwardedHost]}'`
      );
      res.redirect(mapping[forwardedHost]);
    }
  });
