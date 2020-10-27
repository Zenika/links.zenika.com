import React from "react";
import { List, Datagrid, FunctionField, NumberField } from "react-admin";
import { ExternalLink } from "./ExternalLink";

export const HitsByOutgoingLinkList = (props) => (
  <List {...props}>
    <Datagrid>
      <FunctionField
        source="outgoing_link"
        label="Outgoing Link"
        render={(record) => (
          <ExternalLink href={record.outgoing_link}>
            {record.outgoing_link}
          </ExternalLink>
        )}
      />
      <NumberField source="hit_count" label="Redirection count" />
    </Datagrid>
  </List>
);
