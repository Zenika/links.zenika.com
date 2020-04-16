// Based on https://auth0.com/docs/quickstart/spa/react/01-login

import React, { useState, useEffect, useContext } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";

export const Auth0Context = React.createContext();
export const useAuth0 = () => useContext(Auth0Context);
export const Auth0Provider = ({ children, ...auth0ClientOptions }) => {
  const [authState, setAuthState] = useState({
    loading: true,
    user: undefined,
    client: undefined,
  });

  useEffect(() => {
    (async () => {
      const client = await createAuth0Client(auth0ClientOptions);
      setAuthState({
        loading: true,
        user: undefined,
        client,
      });

      if (
        window.location.search.includes("code=") &&
        window.location.search.includes("state=")
      ) {
        await client.handleRedirectCallback();
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
      }

      const user = (await client.isAuthenticated())
        ? await client.getUser()
        : undefined;

      setAuthState({ loading: false, user, client });
    })();
  }, []);

  const logout = async (...args) => {
    setAuthState({
      loading: false,
      user: undefined,
      client: authState.client,
    });
    await authState.client.logout(...args);
  };

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated: authState.user !== undefined,
        user: authState.user,
        loading: authState.loading,
        getIdTokenClaims: (...args) =>
          authState.client.getIdTokenClaims(...args),
        loginWithRedirect: (...args) =>
          authState.client.loginWithRedirect(...args),
        getTokenSilently: (...args) =>
          authState.client.getTokenSilently(...args),
        logout,
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};
