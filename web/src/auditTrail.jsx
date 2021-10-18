import React from "react";
import {
  List,
  Datagrid,
  FunctionField,
  DateField,
  TextField,
  ReferenceField,
  NumberField,
} from "react-admin";
import { useStyles } from "./useStyles";
import { IncomingLink } from "./IncomingLink";

export const AuditTrailList = (props) => {
  const classes = useStyles();
  return (
    <List
      {...props}
      title="Audit Trail"
      sort={{ field: "event_id", order: "DESC" }}
    >
      <Datagrid>
        <NumberField source="event_id" />
        <ReferenceField
          label="Generated link"
          source="entity_id"
          reference="links"
          link={false}
          sortable={false}
        >
          <FunctionField
            source="incoming_link"
            className={classes.link}
            render={IncomingLink}
          />
        </ReferenceField>
        <FunctionField
          source="action"
          label="Action"
          render={({ action }) => (action === "I" ? "Create" : "Update")}
        />
        <DateField source="timestamp" showTime={true} label="Time" />
        <TextField source="user_name" />
      </Datagrid>
    </List>
  );
};
