import React from "react";
import { Admin, Resource } from "react-admin";
import hasuraDataProvider from "ra-data-hasura";

// The following components are created when following the react-admin tutorial
import { PostList, PostEdit, PostCreate, PostShow } from "./links";

const headers = {
  "content-type": "application/json",
};

const App = () => (
  <Admin
    dataProvider={hasuraDataProvider(process.env.HASURA_ENDPOINT, headers)}
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

export default App;
