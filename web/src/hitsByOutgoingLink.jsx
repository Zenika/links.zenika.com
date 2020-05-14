import React from "react";
import { List, Datagrid, TextField, NumberField } from "react-admin";

export const HitsByOutgoingLinkList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="outgoing_link" label="Outgoing Link" />
      <NumberField source="hit_count" label="Redirection count" />
    </Datagrid>
  </List>
);
