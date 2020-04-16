import React from "react";
import { Admin, Resource, fetchUtils, Loading } from "react-admin";
import hasuraDataProvider from "ra-data-hasura";
import { PostList, PostEdit, PostCreate, PostShow } from "./links";
import { useAuth0 } from "./auth0";

const httpClient = (auth0) => async (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  const token = await auth0.getTokenSilently();
  options.headers.set("Authorization", `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};

const App = () => {
  const auth0 = useAuth0();
  if (auth0.loading !== false) {
    return (
      <Loading
        loadingPrimary="Loading..."
        loadingSecondary="Checking authentication..."
      />
    );
  }
  if (auth0.isAuthenticated !== true) {
    auth0.loginWithRedirect();
    return (
      <Loading
        loadingPrimary="Loading..."
        loadingSecondary="Redirecting to login page..."
      />
    );
  }
  return (
    <Admin
      dataProvider={hasuraDataProvider(
        process.env.HASURA_ENDPOINT,
        httpClient(auth0)
      )}
      authProvider={{
        async login() {},
        async logout() {
          await auth0.logout();
        },
        async checkAuth() {},
        async getPermissions() {},
      }}
    >
      <Resource
        name="links"
        list={PostList}
        edit={PostEdit}
        create={PostCreate}
        show={PostShow}
      />
    </Admin>
  );
};

export default App;
