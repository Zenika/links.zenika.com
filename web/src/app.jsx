import React from "react";
import { Admin, Resource, fetchUtils, Loading } from "react-admin";
import hasuraDataProvider from "ra-data-hasura";
import { LinkList, LinkEdit, LinkCreate } from "./links";
import { useAuth0 } from "./auth0";
import { HitsByIncomingLinkList } from "./hitsByIncomingLink";
import { HitsByOutgoingLinkList } from "./hitsByOutgoingLink";
import { AuditTrailList } from "./auditTrail";

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
        httpClient(auth0),
        {
          primaryKey: {
            hits_by_incoming_link: "incoming_link",
            hits_by_outgoing_link: "outgoing_link",
            "audit.simple_log": "event_id",
          },
        }
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
        list={LinkList}
        edit={LinkEdit}
        create={LinkCreate}
      />
      <Resource name="hits_by_incoming_link" list={HitsByIncomingLinkList} />
      <Resource name="hits_by_outgoing_link" list={HitsByOutgoingLinkList} />
      <Resource
        name="audit.simple_log"
        options={{ label: "Audit Trail " }}
        list={AuditTrailList}
      />
      {/* Don't remove those, they are need for reference fields targeting those entities to work */}
      <Resource name="audit.entity_summaries" list={null} />
      <Resource name="audit.users_as_last_seen" list={null} />
    </Admin>
  );
};

export default App;
