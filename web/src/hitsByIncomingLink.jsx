import React from "react";
import { List, Datagrid, FunctionField, NumberField } from "react-admin";
import { toAbsoluteIncomingLink } from "./absoluteIncomingLink";
import { ExternalLink } from "./ExternalLink";

export const HitsByIncomingLinkList = (props) => (
  <List {...props}>
    <Datagrid>
      <FunctionField
        source="incoming_link"
        label="Incoming Link"
        render={(record) => (
          <ExternalLink href={toAbsoluteIncomingLink(record.incoming_link)}>
            {record.incoming_link}
          </ExternalLink>
        )}
      />
      <NumberField source="hit_count" label="Click count" />
    </Datagrid>
  </List>
);
