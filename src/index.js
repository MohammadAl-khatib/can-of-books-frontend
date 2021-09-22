import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="dev-35i0ibe7.us.auth0.com"
    clientId="uqSOedMRIEudQUlX7dc3HoieE9F76fUn"
    redirectUri="https://can-of-books-exercise.netlify.app/"
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);