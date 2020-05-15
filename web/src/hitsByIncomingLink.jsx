import React from "react";
import { List, Datagrid, FunctionField, NumberField } from "react-admin";
import { toAbsoluteIncomingLink } from "./utils";

export const HitsByIncomingLinkList = (props) => (
  <List {...props}>
    <Datagrid>
      <FunctionField
        source="incoming_link"
        label="Incoming Link"
        render={(record) => toAbsoluteIncomingLink(record.incoming_link)}
      />
      <NumberField source="hit_count" label="Click count" />
    </Datagrid>
  </List>
);
