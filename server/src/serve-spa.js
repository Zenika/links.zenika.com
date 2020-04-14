const express = require("express");
const path = require("path");

module.exports = function (root, options) {
  console.log(`INFO serving static files from ${root}`);
  return express
    .Router()
    .use(express.static(root, options))
    .use((req, res) => {
      res.sendFile(path.join(root, "index.html"));
    });
};
