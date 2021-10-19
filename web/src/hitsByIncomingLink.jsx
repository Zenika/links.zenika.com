import React from "react";
import { List, Datagrid, FunctionField, NumberField } from "react-admin";
import { IncomingLink } from "./IncomingLink";

export const HitsByIncomingLinkList = (props) => (
  <List {...props}>
    <Datagrid>
      <FunctionField
        source="incoming_link"
        label="Generated Link"
        render={IncomingLink}
      />
      <NumberField source="hit_count" label="Click count" />
    </Datagrid>
  </List>
);
