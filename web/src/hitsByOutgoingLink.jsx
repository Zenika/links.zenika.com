import React from "react";
import { List, Datagrid, FunctionField, NumberField } from "react-admin";
import { toLinkOpeningNewTab } from "./renderUrl";

export const HitsByOutgoingLinkList = (props) => (
  <List {...props}>
    <Datagrid>
      <FunctionField
        source="outgoing_link"
        label="Outgoing Link"
        render={(record) => toLinkOpeningNewTab(record.outgoing_link)}
      />
      <NumberField source="hit_count" label="Redirection count" />
    </Datagrid>
  </List>
);
