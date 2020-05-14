import React from "react";
import { List, Datagrid, FunctionField, NumberField } from "react-admin";

if (!process.env.ABSOLUTE_LINK_PREFIX) {
  throw new Error("ABSOLUTE_LINK_PREFIX is not set");
}

const absoluteLinkPrefix = process.env.ABSOLUTE_LINK_PREFIX;

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

function toAbsoluteIncomingLink(relativeIncomingLink) {
  return relativeIncomingLink ? absoluteLinkPrefix + relativeIncomingLink : "";
}
