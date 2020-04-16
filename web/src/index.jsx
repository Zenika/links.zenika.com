import React from "react";
import ReactDom from "react-dom";
import App from "./app";
import { Auth0Provider } from "./auth0";

if (!process.env.AUTH0_DOMAIN) {
  throw new Error("AUTH0_DOMAIN is not set");
}
if (!process.env.AUTH0_CLIENT_ID) {
  throw new Error("AUTH0_CLIENT_ID is not set");
}
if (!process.env.AUTH0_AUDIENCE) {
  throw new Error("AUTH0_AUDIENCE is not set");
}

ReactDom.render(
  <Auth0Provider
    domain={process.env.AUTH0_DOMAIN}
    client_id={process.env.AUTH0_CLIENT_ID}
    redirect_uri={window.location.origin}
    audience={process.env.AUTH0_AUDIENCE}
  >
    <App />,
  </Auth0Provider>,
  document.getElementById("reactRoot")
);
