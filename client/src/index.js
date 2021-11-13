import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from "@auth0/auth0-react";
import App from './App';

ReactDOM.render(
  <Auth0Provider
  domain="kotek.us.auth0.com"
  clientId="21TU9wrQYd2wMOSJR55sAjlDSgxuos2f"
  redirectUri= {window.location.origin}
  >
  <App />
  </Auth0Provider>,
  document.getElementById('root')
);

